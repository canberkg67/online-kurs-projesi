import prisma from "@/lib/prisma"
import KullanıcıSilmeButonu from "@/components/KullanıcıSilmeButonu"

export const dynamic = "force-dynamic"

export default async function UserListPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
    },
  })

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Tüm Kullanıcılar</h1>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="border p-4 rounded-md flex justify-between items-center"
          >
            <div>
              <p><strong>Kullanıcı Adı:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Rol:</strong> {user.role}</p>
            </div>
            <KullanıcıSilmeButonu userId={user.id} />
          </div>
        ))}
      </div>
    </div>
  )
}
