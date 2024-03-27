import SubprojectForm from "./subprojectform";
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2 relative overflow-hidden overflow-x-auto">
      <div className="absolute inset-0 z-0">
        <Image
          src="/background_agriculture.jpg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={75}
          blurDataURL="/background_agriculture.jpg"
          placeholder="blur"
        />
      </div>
      <div className="relative z-10">
        <SubprojectForm/>
      </div>
    </main>
  );
}
