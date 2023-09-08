import Image from "next/image";
import { FeatureTitle } from "@/components/title";
import { FeatureCard } from "@/components/card";

export default function Home() {
  const features = [
    {
      title: "Use your calendar as a todo list",
      id: "todo-list",
      gradiant: "from-[#f7f0ff] to-[#a78afe]",
      // card: Todo,
      // visual: OtherVisual,
    },
    {
      title: "Color your calendar to organize",
      id: "colors",
      gradiant: "from-[#f5fbff] to-[#addeff]",
      // card: Colors,
      // visual: OtherVisual,
    },
    {
      title: "Instantly know if someone is available",
      id: "availability",
      gradiant: "from-[#f5fff7] to-[#adf8ff]",
      // card: Availability,
      // visual: OtherVisual,
    },
    {
      title: "Track what you listened to when",
      id: "music",
      gradiant: "from-[#f7fff5] to-[#adffd8]",
      // card: Music,
      // visual: MusicVisual,
    },
    {
      title: "Send scheduling links guests love",
      id: "scheduling-links",
      gradiant: "from-[#fff7f5] to-[#ffd8ad]",
      // card: SchedulingLinks,
      // visual: OtherVisual,
    },
    {
      title: "Always know what your team is up to",
      id: "team",
      gradiant: "from-[#fef5ff] to-[#ffade1]",
      // card: Team,
      // visual: OtherVisual,
    },
  ];
  return (
    <div className="mx-auto max-w-6xl px-4">
      <section className="flex flex-col justify-center py-20">
        <h1 className="mb-12 font-heading text-7xl">
          The joyful productivity app.
          <br />
          <span className="text-gray-300">
            Schedule time for todos, events, and contacts
          </span>
        </h1>

        <div className="aspect-video w-2/5 rounded-xl bg-black shadow-md ">
          Fake video
        </div>
      </section>

      <div className="flex w-full items-start gap-20">
        <div className="w-full py-[50vh]">
          <ul>
            {features.map((feature) => (
              <li key={feature.id}>
                <FeatureTitle id={feature.id}>{feature.title}</FeatureTitle>
              </li>
            ))}
          </ul>
        </div>
        <div className="sticky top-0 flex h-screen w-full items-center">
          <div className="relative aspect-square w-full rounded-2xl bg-gray-100">
            {features.map((feature) => (
              <FeatureCard
                gradient={feature.gradiant}
                children={<span />}
                id={feature.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
