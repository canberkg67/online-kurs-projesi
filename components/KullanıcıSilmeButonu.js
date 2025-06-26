"use client"

import { Button } from "@/components/ui/button"

export default function KullanıcıSilmeButonu({ userId }) {
  const handleDelete = async () => {
    const confirmed = confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?");
    if (!confirmed) return;

    const response = await fetch(`/api/users/delete/${userId}`, {
      method: "POST",
    });

    if (response.ok) {
      // Reload page or show success
      location.reload();
    } else {
      alert("Kullanıcı silinemedi.");
    }
  };

  return (
    <Button variant="destructive" size="sm" onClick={handleDelete}>
      Sil
    </Button>
  );
}
