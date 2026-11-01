using System;
using System.Diagnostics;
using System.IO;
using System.Threading;
using System.Windows.Forms;
using Microsoft.Win32;

namespace Dealcraft.Uninstaller
{
    static class Program
    {
        [STAThread]
        static void Main(string[] args)
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            bool isSilent = false;
            bool isRunFromTemp = false;

            if (args != null)
            {
                foreach (var arg in args)
                {
                    if (string.Equals(arg, "/s", StringComparison.OrdinalIgnoreCase) ||
                        string.Equals(arg, "/silent", StringComparison.OrdinalIgnoreCase) ||
                        string.Equals(arg, "--silent", StringComparison.OrdinalIgnoreCase))
                    {
                        isSilent = true;
                    }
                    if (string.Equals(arg, "--run-from-temp", StringComparison.OrdinalIgnoreCase))
                    {
                        isRunFromTemp = true;
                    }
                }
            }

            string localAppData = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
            string targetDir = Path.Combine(localAppData, "Programs", "Dealcraft");

            if (!isRunFromTemp)
            {
                // Step A: We are running from the installed directory (or wherever user launched it)
                if (!isSilent)
                {
                    DialogResult confirm = MessageBox.Show(
                        "Are you sure you want to completely uninstall Dealcraft?",
                        "Dealcraft Uninstall",
                        MessageBoxButtons.YesNo,
                        MessageBoxIcon.Question
                    );

                    if (confirm != DialogResult.Yes)
                    {
                        return;
                    }
                }

                // Copy self to %TEMP% so we can safely delete the install directory
                try
                {
                    string tempExe = Path.Combine(Path.GetTempPath(), "Dealcraft-Uninstall-" + Guid.NewGuid().ToString("N").Substring(0, 8) + ".exe");
                    string currentExe = Process.GetCurrentProcess().MainModule.FileName;
                    File.Copy(currentExe, tempExe, true);

                    ProcessStartInfo psi = new ProcessStartInfo();
                    psi.FileName = tempExe;
                    psi.Arguments = "--run-from-temp" + (isSilent ? " /silent" : "");
                    psi.UseShellExecute = true;
                    Process.Start(psi);
                    return; // Exit this instance immediately so file handles are released
                }
                catch (Exception ex)
                {
                    // Fallback to running in-place if temp copy fails
                    if (!isSilent)
                    {
                        MessageBox.Show("Notice: Proceeding with direct uninstall: " + ex.Message, "Dealcraft", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                    }
                }
            }

            // Step B: We are executing out of TEMP (or fallback) - Perform full clean removal
            try
            {
                // Wait briefly for original uninstaller process to exit
                Thread.Sleep(600);

                // 1. Force kill all application and child processes using taskkill /F /T
                KillAppProcesses();

                // 2. Remove all shortcuts
                RemoveShortcuts();

                // 3. Remove Windows Startup Run key if present
                RemoveRunKey();

                // 4. Remove Windows Settings / Installed Apps registration
                RemoveUninstallKey();

                // 5. Delete program files directory completely
                DeleteTargetDirectory(targetDir);

                // Also clean legacy target directory if present
                string legacyDir = Path.Combine(localAppData, "Programs", "Gr8r Studio CRM");
                if (Directory.Exists(legacyDir))
                {
                    DeleteTargetDirectory(legacyDir);
                }

                // Clean WebView2 app data and local storage completely
                try
                {
                    string webViewData = Path.Combine(localAppData, "com.dealcraft.desktop");
                    if (Directory.Exists(webViewData))
                    {
                        DeleteTargetDirectory(webViewData);
                    }
                }
                catch { }

                // 6. Notify user of success
                if (!isSilent)
                {
                    MessageBox.Show(
                        "Dealcraft was successfully removed from your computer.",
                        "Dealcraft Uninstall",
                        MessageBoxButtons.OK,
                        MessageBoxIcon.Information
                    );
                }
            }
            catch (Exception ex)
            {
                if (!isSilent)
                {
                    MessageBox.Show(
                        "Uninstallation completed with notice: " + ex.Message,
                        "Dealcraft Uninstall",
                        MessageBoxButtons.OK,
                        MessageBoxIcon.Information
                    );
                }
            }
        }

        private static void KillAppProcesses()
        {
            // Use taskkill /F /T to terminate whole process trees including WebView2
            RunProcessHidden("taskkill.exe", "/F /T /IM \"Dealcraft.exe\"");
            RunProcessHidden("taskkill.exe", "/F /T /IM \"dealcraft.exe\"");
            RunProcessHidden("taskkill.exe", "/F /T /IM \"Gr8r Studio CRM.exe\"");
            RunProcessHidden("taskkill.exe", "/F /T /IM \"gr8r-studio-crm.exe\"");

            try
            {
                foreach (var p in Process.GetProcessesByName("Dealcraft"))
                {
                    try { p.Kill(); p.WaitForExit(1000); } catch { }
                }
                foreach (var p in Process.GetProcessesByName("dealcraft"))
                {
                    try { p.Kill(); p.WaitForExit(1000); } catch { }
                }
                foreach (var p in Process.GetProcessesByName("Gr8r Studio CRM"))
                {
                    try { p.Kill(); p.WaitForExit(1000); } catch { }
                }
                foreach (var p in Process.GetProcessesByName("gr8r-studio-crm"))
                {
                    try { p.Kill(); p.WaitForExit(1000); } catch { }
                }
            }
            catch { }

            Thread.Sleep(500);
        }

        private static void RemoveShortcuts()
        {
            try
            {
                // Desktop
                string desktop = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
                string desktopLnk = Path.Combine(desktop, "Dealcraft.lnk");
                if (File.Exists(desktopLnk))
                {
                    File.SetAttributes(desktopLnk, FileAttributes.Normal);
                    File.Delete(desktopLnk);
                }
                string oldDesktopLnk = Path.Combine(desktop, "Gr8r Studio CRM.lnk");
                if (File.Exists(oldDesktopLnk))
                {
                    File.SetAttributes(oldDesktopLnk, FileAttributes.Normal);
                    File.Delete(oldDesktopLnk);
                }

                // Startup (so it never opens on boot after uninstall)
                string startup = Environment.GetFolderPath(Environment.SpecialFolder.Startup);
                string startupLnk = Path.Combine(startup, "Dealcraft.lnk");
                if (File.Exists(startupLnk))
                {
                    File.SetAttributes(startupLnk, FileAttributes.Normal);
                    File.Delete(startupLnk);
                }
                string oldStartupLnk = Path.Combine(startup, "Gr8r Studio CRM.lnk");
                if (File.Exists(oldStartupLnk))
                {
                    File.SetAttributes(oldStartupLnk, FileAttributes.Normal);
                    File.Delete(oldStartupLnk);
                }

                // Start Menu folder
                string startMenu = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Programs), "Dealcraft");
                if (Directory.Exists(startMenu))
                {
                    Directory.Delete(startMenu, true);
                }
                string oldStartMenu = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Programs), "Gr8r Studio CRM");
                if (Directory.Exists(oldStartMenu))
                {
                    Directory.Delete(oldStartMenu, true);
                }
            }
            catch { }
        }

        private static void RemoveRunKey()
        {
            try
            {
                using (RegistryKey run = Registry.CurrentUser.OpenSubKey(@"Software\Microsoft\Windows\CurrentVersion\Run", true))
                {
                    if (run != null)
                    {
                        run.DeleteValue("Dealcraft", false);
                        run.DeleteValue("Gr8rStudioCRM", false);
                    }
                }
            }
            catch { }
        }

        private static void RemoveUninstallKey()
        {
            try
            {
                Registry.CurrentUser.DeleteSubKeyTree(@"Software\Microsoft\Windows\CurrentVersion\Uninstall\Dealcraft", false);
                Registry.CurrentUser.DeleteSubKeyTree(@"Software\Microsoft\Windows\CurrentVersion\Uninstall\Gr8r Studio CRM", false);
            }
            catch { }
        }

        private static void DeleteTargetDirectory(string targetDir)
        {
            if (!Directory.Exists(targetDir)) return;

            // Attempt direct directory deletion with retries
            for (int attempt = 1; attempt <= 5; attempt++)
            {
                try
                {
                    // Reset file attributes in case any are read-only
                    foreach (var file in Directory.GetFiles(targetDir, "*.*", SearchOption.AllDirectories))
                    {
                        try { File.SetAttributes(file, FileAttributes.Normal); } catch { }
                    }

                    Directory.Delete(targetDir, true);
                    return; // Successfully deleted
                }
                catch
                {
                    Thread.Sleep(400);
                }
            }

            // Fallback: spawn background cmd to finish deleting
            try
            {
                ProcessStartInfo psi = new ProcessStartInfo();
                psi.FileName = "cmd.exe";
                psi.Arguments = "/c ping 127.0.0.1 -n 3 > nul & rd /s /q \"" + targetDir + "\"";
                psi.WindowStyle = ProcessWindowStyle.Hidden;
                psi.CreateNoWindow = true;
                Process.Start(psi);
            }
            catch { }
        }

        private static void RunProcessHidden(string file, string args)
        {
            try
            {
                ProcessStartInfo psi = new ProcessStartInfo();
                psi.FileName = file;
                psi.Arguments = args;
                psi.WindowStyle = ProcessWindowStyle.Hidden;
                psi.CreateNoWindow = true;
                using (Process proc = Process.Start(psi))
                {
                    if (proc != null)
                    {
                        proc.WaitForExit(3000);
                    }
                }
            }
            catch { }
        }
    }
}
