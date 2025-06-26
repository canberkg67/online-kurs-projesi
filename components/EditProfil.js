"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function EditProfil({ user }) {
  const router = useRouter();
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.profile?.bio || "");
  const [avatar, setAvatar] = useState(user.profile?.avatar || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/profile/update/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, bio, avatar }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      alert("Profil güncellenemedi.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="username">Kullanıcı Adı</Label>
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="bio">Hakkınızda</Label>
        <Textarea
          id="bio"
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="avatar">Avatar URL (Resminizin URLsini buraya ekleyin) </Label>
        <Input
          id="avatar"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </div>
      <Button type="submit">Güncelle</Button>
    </form>
  );
}
