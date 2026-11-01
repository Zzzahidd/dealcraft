using System;
using System.IO;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Windows.Forms;
using System.Text;
using System.Reflection;
using System.Runtime.InteropServices;
using Microsoft.Win32;

namespace Dealcraft.Installer
{
    public class SetupForm : Form
    {
        private const string LOGO_BASE64 = "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";

        // Panels for two steps
        private Panel pnlInstalling;
        private Panel pnlHeader;
        private Label lblInstallTitle;
        private Label lblInstallSub;
        private PictureBox picHeaderLogo;
        private ProgressBar progressBar;

        private Panel pnlFinish;
        private Panel pnlBanner;
        private Label lblFinishTitle;
        private Label lblFinishDesc1;
        private Label lblFinishDesc2;
        private CheckBox chkRunApp;

        // Bottom footer controls
        private Panel pnlFooter;
        private Label lblVersion;
        private Button btnBack;
        private Button btnNextFinish;
        private Button btnCancel;

        private System.Windows.Forms.Timer timer;
        private int step = 0;
        private string targetDir;
        private string installedExe;
        private string sourceDir;
        private Image logoImg;

        public SetupForm()
        {
            // Standard NSIS Modern UI Wizard Form Settings
            this.Text = "Dealcraft Setup";
            this.ClientSize = new Size(497, 356);
            this.StartPosition = FormStartPosition.CenterScreen;
            this.FormBorderStyle = FormBorderStyle.FixedDialog;
            this.MaximizeBox = false;
            this.MinimizeBox = true;
            this.BackColor = SystemColors.Control;
            this.Font = new Font("Segoe UI", 9f, FontStyle.Regular);

            string localAppData = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
            targetDir = Path.Combine(localAppData, "Programs", "Dealcraft");
            installedExe = Path.Combine(targetDir, "Dealcraft.exe");

            // Locate source directory
            string appBase = AppDomain.CurrentDomain.BaseDirectory;
            if (File.Exists(Path.Combine(appBase, "Dealcraft.exe")))
            {
                sourceDir = appBase;
            }
            else if (Directory.Exists(Path.Combine(appBase, "gr8r-studio-desktop")))
            {
                sourceDir = Path.Combine(appBase, "gr8r-studio-desktop");
            }
            else
            {
                sourceDir = appBase;
            }

            // Load embedded logo
            try
            {
                byte[] raw = Convert.FromBase64String(LOGO_BASE64);
                MemoryStream ms = new MemoryStream(raw);
                logoImg = Image.FromStream(ms);
                Bitmap bmp = new Bitmap(logoImg);
                this.Icon = Icon.FromHandle(bmp.GetHicon());
            }
            catch { }

            // -------------------------------------------------------------
            // STEP 1: INSTALLING PANEL
            // -------------------------------------------------------------
            pnlInstalling = new Panel();
            pnlInstalling.Location = new Point(0, 0);
            pnlInstalling.Size = new Size(497, 308);
            pnlInstalling.BackColor = SystemColors.Control;
            this.Controls.Add(pnlInstalling);

            // Top Header (White)
            pnlHeader = new Panel();
            pnlHeader.Location = new Point(0, 0);
            pnlHeader.Size = new Size(497, 62);
            pnlHeader.BackColor = Color.White;
            pnlHeader.Paint += (s, e) =>
            {
                using (Pen p = new Pen(Color.FromArgb(217, 217, 217)))
                {
                    e.Graphics.DrawLine(p, 0, pnlHeader.Height - 1, pnlHeader.Width, pnlHeader.Height - 1);
                }
            };
            pnlInstalling.Controls.Add(pnlHeader);

            lblInstallTitle = new Label();
            lblInstallTitle.Text = "Installing";
            lblInstallTitle.Font = new Font("Segoe UI", 12f, FontStyle.Bold);
            lblInstallTitle.ForeColor = Color.Black;
            lblInstallTitle.Location = new Point(18, 11);
            lblInstallTitle.AutoSize = true;
            pnlHeader.Controls.Add(lblInstallTitle);

            lblInstallSub = new Label();
            lblInstallSub.Text = "Please wait while Dealcraft is being installed.";
            lblInstallSub.Font = new Font("Segoe UI", 9f, FontStyle.Regular);
            lblInstallSub.ForeColor = Color.FromArgb(40, 40, 40);
            lblInstallSub.Location = new Point(34, 34);
            lblInstallSub.AutoSize = true;
            pnlHeader.Controls.Add(lblInstallSub);

            picHeaderLogo = new PictureBox();
            picHeaderLogo.Location = new Point(440, 10);
            picHeaderLogo.Size = new Size(40, 40);
            picHeaderLogo.SizeMode = PictureBoxSizeMode.Zoom;
            if (logoImg != null) picHeaderLogo.Image = logoImg;
            pnlHeader.Controls.Add(picHeaderLogo);

            // Progress Bar
            progressBar = new ProgressBar();
            progressBar.Location = new Point(24, 98);
            progressBar.Size = new Size(448, 20);
            progressBar.Style = ProgressBarStyle.Continuous;
            progressBar.Value = 0;
            pnlInstalling.Controls.Add(progressBar);

            // -------------------------------------------------------------
            // STEP 2: FINISH PANEL (Classic Wizard layout)
            // -------------------------------------------------------------
            pnlFinish = new Panel();
            pnlFinish.Location = new Point(0, 0);
            pnlFinish.Size = new Size(497, 308);
            pnlFinish.BackColor = Color.White;
            pnlFinish.Visible = false;
            this.Controls.Add(pnlFinish);

            // Left Blue Banner (#0078d7)
            pnlBanner = new Panel();
            pnlBanner.Location = new Point(0, 0);
            pnlBanner.Size = new Size(164, 308);
            pnlBanner.BackColor = Color.FromArgb(0, 120, 215);
            pnlBanner.Paint += PnlBanner_Paint;
            pnlFinish.Controls.Add(pnlBanner);



            // Right content
            lblFinishTitle = new Label();
            lblFinishTitle.Text = "Completing Dealcraft Setup";
            lblFinishTitle.Font = new Font("Segoe UI", 12f, FontStyle.Bold);
            lblFinishTitle.ForeColor = Color.Black;
            lblFinishTitle.Location = new Point(184, 18);
            lblFinishTitle.Size = new Size(300, 32);
            pnlFinish.Controls.Add(lblFinishTitle);

            lblFinishDesc1 = new Label();
            lblFinishDesc1.Text = "Dealcraft has been installed on your computer.";
            lblFinishDesc1.Font = new Font("Segoe UI", 9f, FontStyle.Regular);
            lblFinishDesc1.ForeColor = Color.Black;
            lblFinishDesc1.Location = new Point(184, 66);
            lblFinishDesc1.Size = new Size(300, 24);
            pnlFinish.Controls.Add(lblFinishDesc1);

            lblFinishDesc2 = new Label();
            lblFinishDesc2.Text = "Click Finish to close Setup.";
            lblFinishDesc2.Font = new Font("Segoe UI", 9f, FontStyle.Regular);
            lblFinishDesc2.ForeColor = Color.Black;
            lblFinishDesc2.Location = new Point(184, 96);
            lblFinishDesc2.Size = new Size(300, 24);
            pnlFinish.Controls.Add(lblFinishDesc2);

            chkRunApp = new CheckBox();
            chkRunApp.Text = "Run Dealcraft";
            chkRunApp.Font = new Font("Segoe UI", 9f, FontStyle.Regular);
            chkRunApp.ForeColor = Color.Black;
            chkRunApp.Checked = true;
            chkRunApp.Location = new Point(184, 150);
            chkRunApp.Size = new Size(200, 24);
            pnlFinish.Controls.Add(chkRunApp);

            // -------------------------------------------------------------
            // FOOTER (Always present at bottom)
            // -------------------------------------------------------------
            pnlFooter = new Panel();
            pnlFooter.Location = new Point(0, 308);
            pnlFooter.Size = new Size(497, 48);
            pnlFooter.BackColor = SystemColors.Control;
            pnlFooter.Paint += (s, e) =>
            {
                using (Pen p = new Pen(Color.FromArgb(217, 217, 217)))
                {
                    e.Graphics.DrawLine(p, 0, 0, pnlFooter.Width, 0);
                }
            };
            this.Controls.Add(pnlFooter);

            lblVersion = new Label();
            lblVersion.Text = "Dealcraft 1.0.0";
            lblVersion.Font = new Font("Segoe UI", 8.5f, FontStyle.Regular);
            lblVersion.ForeColor = Color.FromArgb(120, 120, 120);
            lblVersion.Location = new Point(12, 16);
            lblVersion.AutoSize = true;
            pnlFooter.Controls.Add(lblVersion);

            btnBack = new Button();
            btnBack.Text = "< Back";
            btnBack.Location = new Point(246, 12);
            btnBack.Size = new Size(75, 25);
            btnBack.Enabled = false;
            pnlFooter.Controls.Add(btnBack);

            btnNextFinish = new Button();
            btnNextFinish.Text = "Next >";
            btnNextFinish.Location = new Point(328, 12);
            btnNextFinish.Size = new Size(75, 25);
            btnNextFinish.Enabled = false;
            btnNextFinish.Click += BtnNextFinish_Click;
            pnlFooter.Controls.Add(btnNextFinish);

            btnCancel = new Button();
            btnCancel.Text = "Cancel";
            btnCancel.Location = new Point(410, 12);
            btnCancel.Size = new Size(75, 25);
            btnCancel.Enabled = false;
            pnlFooter.Controls.Add(btnCancel);

            // Timer for installation progress
            timer = new System.Windows.Forms.Timer();
            timer.Interval = 220;
            timer.Tick += Timer_Tick;
            timer.Start();
        }

        private void PnlBanner_Paint(object sender, PaintEventArgs e)
        {
            Graphics g = e.Graphics;
            g.SmoothingMode = SmoothingMode.AntiAlias;

            // Draw white laptop & arrow illustration (classic NSIS wizard aesthetic)
            using (Pen pen = new Pen(Color.White, 3))
            using (SolidBrush brush = new SolidBrush(Color.White))
            {
                int cx = 82;
                int cy = 200;

                // Laptop screen rectangle
                g.DrawRectangle(pen, cx - 44, cy - 36, 88, 54);

                // Laptop base
                g.DrawLine(pen, cx - 56, cy + 24, cx + 56, cy + 24);

                // Download arrow
                Point[] arrowHead = new Point[]
                {
                    new Point(cx, cy + 14),
                    new Point(cx - 16, cy - 2),
                    new Point(cx - 7, cy - 2),
                    new Point(cx - 7, cy - 24),
                    new Point(cx + 7, cy - 24),
                    new Point(cx + 7, cy - 2),
                    new Point(cx + 16, cy - 2)
                };
                g.FillPolygon(brush, arrowHead);
            }
        }

        public void PerformInstall()
        {
            try
            {
                foreach (var p in System.Diagnostics.Process.GetProcessesByName("Dealcraft"))
                {
                    p.Kill();
                    p.WaitForExit(1000);
                }
                foreach (var p in System.Diagnostics.Process.GetProcessesByName("Gr8r Studio CRM"))
                {
                    p.Kill();
                    p.WaitForExit(1000);
                }
                foreach (var p in System.Diagnostics.Process.GetProcessesByName("gr8r-studio-crm"))
                {
                    p.Kill();
                    p.WaitForExit(1000);
                }
            }
            catch { }

            if (!Directory.Exists(targetDir))
                Directory.CreateDirectory(targetDir);

            // Purge WebView2 browser and code caches so fresh assets are loaded immediately
            try
            {
                string localApp = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
                string ebDefault = Path.Combine(localApp, "com.dealcraft.desktop", "EBWebView", "Default");
                if (Directory.Exists(ebDefault))
                {
                    string[] cacheDirs = new string[] { "Cache", "Code Cache", "GPUCache", "Service Worker" };
                    foreach (var c in cacheDirs)
                    {
                        string cp = Path.Combine(ebDefault, c);
                        if (Directory.Exists(cp))
                        {
                            try { Directory.Delete(cp, true); } catch { }
                        }
                    }
                }
            }
            catch { }

            Action<string, string> extractOrCopy = (filename, destPath) =>
            {
                var asm = Assembly.GetExecutingAssembly();
                using (var stream = asm.GetManifestResourceStream(filename))
                {
                    if (stream != null)
                    {
                        using (var fs = new FileStream(destPath, FileMode.Create, FileAccess.Write))
                        {
                            stream.CopyTo(fs);
                        }
                        return;
                    }
                }
                string diskPath = Path.Combine(sourceDir, filename);
                if (File.Exists(diskPath))
                {
                    File.Copy(diskPath, destPath, true);
                    return;
                }
            };

            string destExe = Path.Combine(targetDir, "Dealcraft.exe");
            extractOrCopy("Dealcraft.exe", destExe);

            string dllSrc = Path.Combine(sourceDir, "WebView2Loader.dll");
            string destDll = Path.Combine(targetDir, "WebView2Loader.dll");
            if (File.Exists(dllSrc))
                File.Copy(dllSrc, destDll, true);
            else
                extractOrCopy("WebView2Loader.dll", destDll);

            // Copy server folder
            string srvSrc = Path.Combine(sourceDir, "server");
            string srvDst = Path.Combine(targetDir, "server");
            if (Directory.Exists(srvSrc))
            {
                if (!Directory.Exists(srvDst)) Directory.CreateDirectory(srvDst);
                string script = Path.Combine(srvSrc, "desktop-service.mjs");
                if (File.Exists(script))
                    File.Copy(script, Path.Combine(srvDst, "desktop-service.mjs"), true);
            }

            // Copy icons folder
            string iconSrc = Path.Combine(sourceDir, "src-tauri", "icons");
            if (!Directory.Exists(iconSrc))
                iconSrc = Path.Combine(sourceDir, "icons");
            string iconDst = Path.Combine(targetDir, "icons");
            if (Directory.Exists(iconSrc))
            {
                if (!Directory.Exists(iconDst)) Directory.CreateDirectory(iconDst);
                string ico = Path.Combine(iconSrc, "icon.ico");
                if (File.Exists(ico))
                    File.Copy(ico, Path.Combine(iconDst, "icon.ico"), true);
                string dealIco = Path.Combine(iconSrc, "dealcraft.ico");
                if (File.Exists(dealIco))
                    File.Copy(dealIco, Path.Combine(iconDst, "dealcraft.ico"), true);
            }

            // Copy uninstaller
            string uninst = Path.Combine(sourceDir, "uninstall.ps1");
            if (File.Exists(uninst))
                File.Copy(uninst, Path.Combine(targetDir, "uninstall.ps1"), true);
            extractOrCopy("Uninstall.exe", Path.Combine(targetDir, "Uninstall.exe"));

            RegisterUninstallKey();
            CreateShortcuts();
        }

        private void Timer_Tick(object sender, EventArgs e)
        {
            step++;
            switch (step)
            {
                case 1:
                    progressBar.Value = 25;
                    break;

                case 2:
                    progressBar.Value = 65;
                    PerformInstall();
                    break;

                case 3:
                    progressBar.Value = 90;
                    break;

                case 4:
                    progressBar.Value = 100;
                    timer.Stop();

                    // Switch to Finish Page
                    pnlInstalling.Visible = false;
                    pnlFinish.Visible = true;
                    lblVersion.Visible = false; // Hidden on finish page just like Linear

                    btnNextFinish.Text = "Finish";
                    btnNextFinish.Enabled = true;
                    this.AcceptButton = btnNextFinish;
                    btnNextFinish.Focus();
                    break;
            }
        }

        private void CreateShortcuts()
        {
            string desktopDir = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
            string startMenuDir = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Programs), "Dealcraft");
            if (!Directory.Exists(startMenuDir))
                Directory.CreateDirectory(startMenuDir);

            // Clean up legacy shortcuts
            try
            {
                string oldDesktop = Path.Combine(desktopDir, "Gr8r Studio CRM.lnk");
                if (File.Exists(oldDesktop)) File.Delete(oldDesktop);
                string oldStartMenu = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Programs), "Gr8r Studio CRM");
                if (Directory.Exists(oldStartMenu)) Directory.Delete(oldStartMenu, true);
                string oldStartup = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Startup), "Gr8r Studio CRM.lnk");
                if (File.Exists(oldStartup)) File.Delete(oldStartup);
            }
            catch { }

            string startupDir = Environment.GetFolderPath(Environment.SpecialFolder.Startup);
            string desktopShortcut = Path.Combine(desktopDir, "Dealcraft.lnk");
            string startMenuShortcut = Path.Combine(startMenuDir, "Dealcraft.lnk");
            string startupShortcut = Path.Combine(startupDir, "Dealcraft.lnk");
            string iconPath = Path.Combine(targetDir, "icons", "dealcraft.ico");
            if (!File.Exists(iconPath)) iconPath = Path.Combine(targetDir, "icons", "icon.ico");
            if (!File.Exists(iconPath)) iconPath = installedExe;

            CreateNativeShortcut(desktopShortcut, installedExe, targetDir, iconPath, "Dealcraft: Unified calm workspace and sales CRM", "");
            CreateNativeShortcut(startMenuShortcut, installedExe, targetDir, iconPath, "Dealcraft: Unified calm workspace and sales CRM", "");
            CreateNativeShortcut(startupShortcut, installedExe, targetDir, iconPath, "Dealcraft: Background global hotkey listener", "--background");

            string uninstShortcut = Path.Combine(startMenuDir, "Uninstall Dealcraft.lnk");
            string uninstExePath = Path.Combine(targetDir, "Uninstall.exe");
            CreateNativeShortcut(uninstShortcut, uninstExePath, targetDir, iconPath, "Uninstall Dealcraft", "");

            // Also create on OneDrive Desktop if present
            try
            {
                string userProfile = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
                string oneDriveDesktop = Path.Combine(userProfile, "OneDrive", "Desktop");
                if (Directory.Exists(oneDriveDesktop))
                {
                    CreateNativeShortcut(Path.Combine(oneDriveDesktop, "Dealcraft.lnk"), installedExe, targetDir, iconPath, "Dealcraft: Unified calm workspace and sales CRM", "");
                }
            }
            catch { }
        }

        private void CreateNativeShortcut(string shortcutPath, string target, string workingDir, string icon, string desc, string args)
        {
            try
            {
                Type shellType = Type.GetTypeFromProgID("WScript.Shell");
                if (shellType != null)
                {
                    object shell = Activator.CreateInstance(shellType);
                    object shortcut = shellType.InvokeMember("CreateShortcut", BindingFlags.InvokeMethod, null, shell, new object[] { shortcutPath });
                    Type scType = shortcut.GetType();
                    scType.InvokeMember("TargetPath", BindingFlags.SetProperty, null, shortcut, new object[] { target });
                    scType.InvokeMember("WorkingDirectory", BindingFlags.SetProperty, null, shortcut, new object[] { workingDir });
                    scType.InvokeMember("Description", BindingFlags.SetProperty, null, shortcut, new object[] { desc });
                    if (!string.IsNullOrEmpty(args))
                        scType.InvokeMember("Arguments", BindingFlags.SetProperty, null, shortcut, new object[] { args });
                    if (File.Exists(icon))
                        scType.InvokeMember("IconLocation", BindingFlags.SetProperty, null, shortcut, new object[] { icon + ",0" });
                    scType.InvokeMember("Save", BindingFlags.InvokeMethod, null, shortcut, null);
                    return;
                }
            }
            catch { }
        }

        private void RegisterUninstallKey()
        {
            try
            {
                string regPath = @"Software\Microsoft\Windows\CurrentVersion\Uninstall\Dealcraft";
                using (RegistryKey key = Registry.CurrentUser.CreateSubKey(regPath))
                {
                    if (key != null)
                    {
                        string iconPath = Path.Combine(targetDir, "icons", "dealcraft.ico");
                        if (!File.Exists(iconPath)) iconPath = Path.Combine(targetDir, "icons", "icon.ico");
                        if (!File.Exists(iconPath)) iconPath = installedExe;
                        string uninstPath = Path.Combine(targetDir, "Uninstall.exe");

                        key.SetValue("DisplayName", "Dealcraft");
                        key.SetValue("DisplayIcon", iconPath + ",0");
                        key.SetValue("DisplayVersion", "1.0.0");
                        key.SetValue("Publisher", "Dealcraft");
                        key.SetValue("InstallLocation", targetDir);
                        key.SetValue("UninstallString", "\"" + uninstPath + "\"");
                        key.SetValue("QuietUninstallString", "\"" + uninstPath + "\" /silent");
                        key.SetValue("NoModify", 1, RegistryValueKind.DWord);
                        key.SetValue("NoRepair", 1, RegistryValueKind.DWord);
                        key.SetValue("WindowsInstaller", 0, RegistryValueKind.DWord);
                        key.SetValue("EstimatedSize", 68000, RegistryValueKind.DWord);
                        key.SetValue("HelpLink", "https://dealcraft.app");
                        key.SetValue("URLInfoAbout", "https://dealcraft.app");
                    }
                }
            }
            catch { }
        }

        private void BtnNextFinish_Click(object sender, EventArgs e)
        {
            if (chkRunApp.Checked && File.Exists(installedExe))
            {
                try
                {
                    System.Diagnostics.ProcessStartInfo psi = new System.Diagnostics.ProcessStartInfo();
                    psi.FileName = installedExe;
                    psi.WorkingDirectory = targetDir;
                    psi.WindowStyle = System.Diagnostics.ProcessWindowStyle.Normal;
                    System.Diagnostics.Process.Start(psi);
                }
                catch { }
            }
            this.Close();
        }

        [STAThread]
        public static void Main(string[] args)
        {
            if (args != null && args.Length > 0 && (args[0].ToLower() == "/s" || args[0].ToLower() == "/silent"))
            {
                SetupForm setup = new SetupForm();
                setup.PerformInstall();
                return;
            }

            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new SetupForm());
        }
    }
}
