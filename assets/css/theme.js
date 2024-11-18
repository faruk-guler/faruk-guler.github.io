document.addEventListener(DOMContentLoaded, () = {
   Kullanıcı teması localStorage'da kaydedilmişse, onu uygula
  const savedTheme = localStorage.getItem(theme);

  if (savedTheme) {
    document.documentElement.setAttribute(data-theme, savedTheme);
  } else {
     Varsayılan olarak dark mode aktif et
    document.documentElement.setAttribute(data-theme, dark);
    localStorage.setItem(theme, dark);  Tema tercihini kaydet
  }

   Tema geçiş düğmesine tıklandığında
  const themeSwitchButton = document.getElementById(theme-switch);
  if (themeSwitchButton) {
    themeSwitchButton.addEventListener(click, () = {
      const currentTheme = document.documentElement.getAttribute(data-theme);
      const newTheme = currentTheme === dark  light  dark;
      document.documentElement.setAttribute(data-theme, newTheme);
      localStorage.setItem(theme, newTheme);  Yeni tema tercihini kaydet
    });
  }
});
