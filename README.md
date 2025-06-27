# Online Kurs Projesi
**Proje Açıklaması:**
Proje bir online kurs projesidir.Burada örnek olarak bir İngilizce kursu ele alınmıştır.Uygulamada bir dersin veya kursun dersleri ile materyalleri online olarak eklenebilmektedir.Sadece kayıtlı olan kursiyeler bunları görüp çalışabilmektedir.Sistemdeki herkesin birbirine mesaj atabilme imkanı olması sayesinde,kursiyerler birbirinden yardım alabilmekte ve admine de soru yöneltebilmektedirler.

**Kullanılan Teknolojiler:**
NextJS, ShadCN, AuthJS Credentials Provider, Prisma, SQLite

**Hesap Bilgileri:**
- Admin Hesabı: email - adminkurs@example.com / şifre - 123admin123
- Örnek User Hesabı: email - testkurs@example.com / şifre - 123test123

**Kurulum:**
- npm install ile gerekli node_modules klasörünü yükleyin.
- npx prisma generate deyin. Aksi taktirde prisma işlemleri ve dolayısıyla giriş-veritabanı işlemi yapılamaz.
- npm run dev ile geliştirme sunucusu açabilirsiniz.
- Giriş yapan kullanıcı yukarıdaki admin hesabı ise admin dashboardına,user rolünde ise profile yönlendirilmektedir.
- Ders ekleme ve düzenleme,kullanıcı silme admine has işlevlerdir.Kullanıcılar profillerinden butona tıklayarak derslere gidebilir,mesaj atabilir,bilgilerini değiştirebilirler.
- İki kullanıcı arasındaki mesajların geçmişi sekmelerce tutulduğu gibi,gelen ve giden son üç mesaj da altta görülebilmektedir.Mesajlar temizlenebilmektedir.

