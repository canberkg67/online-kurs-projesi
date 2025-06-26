import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditDersForm from "@/components/EditDersForm";

export default async function EditLessonPage({ params }) {
  const { slug } = await params; 

  const lesson = await prisma.lesson.findUnique({
    where: { slug },
  });

  if (!lesson) notFound();

  return <EditDersForm lesson={lesson} />;
}
