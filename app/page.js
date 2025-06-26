export default function Home() {
  return (
    <section className= "max-w-2xl mx-auto text-center mt-16 space-y-4">
      <h1 className="text-3xl font-bold">İngilizce Kursuna Hoşgeldiniz!</h1>
      <p className="text-muted-foreground">
        Bu proje;İngilizce öğrenmek için admin-eğitmen tarafından derslerin paylaşılması,kursiyerlerin de bunlara erişebilmesi ve kendileri arasında mesajlaşabilmeleri amacını taşımaktadır.
      </p>
      <p className="text-muted-foreground">
        Kullanıcılar kayıt olup giriş yapmaktadır.Admin ve normal kullanıcı rolleri vardır. Kullanıcıların kendi profilleri vardır.Giriş yapan admin kendi dashboardına,normal kullanıcılar ise profillerine yönlendirilmektedir.
      </p>
      <p className="text-muted-foreground">
        Bu proje Next.js,ShadCN UI,Prisma ORM+SQLite ve AuthJS Crendentials kullanılarak yapılmıştır.
      </p>
      <p className="text-muted-foreground">
        Bu örnek kimlik doğrulama, rol tabanlı erişim ve dinamik içerik örneklerini taşımaktadır.Admin rotalarına normal kullanıcı erişememektedir ve sadece admine has işlevler vardır.
      </p>
    </section>
  );
}
