export default function ControlItem({ children }: { children: React.ReactNode }) {
  return (
    <section className=" flex justify-center items-center rounded-full overflow-hidden mb-4">
      <div className="absolute w-[60px] h-[60px] bg-purple-500 animate-randomColor rounded-full z-0"></div>
      {children}
    </section>
  );
}
