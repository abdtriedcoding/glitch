import Marquee from "@/components/ui/marquee";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TESTIMONIALS = [
  {
    name: "Alice",
    message:
      "Glitch has been a game-changer for our team. With its reliable end-to-end testing, we catch bugs early, leading to faster development cycles and improved collaboration.",
  },
  {
    name: "Bob",
    message:
      "I used to spend hours debugging frontend issues, but Glitch simplified everything. Now, I'm more productive, and my colleagues can trust our code thanks to Glitch.",
  },
  {
    name: "Charlie",
    message:
      "Glitch has transformed the way we work. Our QA and development teams are on the same page, and our productivity has skyrocketed. It's a must-have tool.",
  },
  {
    name: "David",
    message:
      "I was skeptical at first, but Glitch exceeded my expectations. Our project timelines have improved, and collaboration between teams is seamless.",
  },
  {
    name: "Ella",
    message:
      "Glitch made writing and running tests a breeze. Our team's productivity has never been higher, and we're delivering more reliable software.",
  },
  {
    name: "Frank",
    message:
      "Thanks to Glitch, we've eliminated testing bottlenecks. Our developers and testers collaborate effortlessly, resulting in quicker releases.",
  },
  {
    name: "Grace",
    message:
      "Glitch has improved our development process significantly. We now have more time for innovation, and our products are of higher quality.",
  },
  {
    name: "Hank",
    message:
      "Glitch's user-friendly interface made it easy for our non-technical team members to contribute to testing. Our workflow is much more efficient now.",
  },
  {
    name: "Ivy",
    message:
      "Our team's collaboration improved immensely with Glitch. We catch issues early, leading to less friction and quicker feature deployments.",
  },
  {
    name: "Jack",
    message:
      "Glitch's robust testing capabilities have elevated our development standards. We work more harmoniously, and our releases are more reliable.",
  },
  {
    name: "Katherine",
    message:
      "Glitch is a lifesaver for our cross-functional teams. We're more productive, and there's a shared sense of responsibility for product quality.",
  },
  {
    name: "Liam",
    message:
      "Glitch has helped us maintain high standards of quality. Our team's collaboration has improved, resulting in faster development cycles.",
  },
  {
    name: "Mia",
    message:
      "Glitch is a powerful tool that improved our productivity and collaboration. It's now an integral part of our development process.",
  },
  {
    name: "Nathan",
    message:
      "Glitch's user-friendly interface and detailed reporting have made testing a breeze. Our team's productivity is at an all-time high.",
  },
  {
    name: "Olivia",
    message:
      "We saw immediate benefits in terms of productivity and collaboration after adopting Glitch. It's an essential tool for our development workflow.",
  },
  {
    name: "Paul",
    message:
      "Glitch has streamlined our testing process and brought our teams closer. We're more efficient and deliver better results.",
  },
  {
    name: "Quinn",
    message:
      "Glitch has been a game-changer for us. Our productivity and collaboration have improved significantly, leading to better software.",
  },
  {
    name: "Rachel",
    message:
      "Thanks to Glitch, our testing process is now a seamless part of our development cycle. Our teams collaborate effortlessly.",
  },
  {
    name: "Sam",
    message:
      "Glitch is a fantastic tool that has revolutionized our workflow. Our productivity and collaboration have reached new heights.",
  },
];

const firstRow = TESTIMONIALS.slice(0, TESTIMONIALS.length / 2);
const secondRow = TESTIMONIALS.slice(TESTIMONIALS.length / 2);

export function Testimonials() {
  return (
    <section className="w-full space-y-6">
      <div className="px-4 md:px-8">
        <h1 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          <span className="relative bg-gradient-to-r from-indigo-500 to-purple-500/80 bg-clip-text font-extrabold text-transparent">
            Trusted by all
          </span>
        </h1>
        <p className="text-center leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Join thousands of satisfied users who rely on our platform for their
          personal and professional productivity needs.
        </p>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-10 ">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review, idx) => (
            <ReviewCard key={idx} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review, idx) => (
            <ReviewCard key={idx} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
    </section>
  );
}

const ReviewCard = ({ name, message }: { name: string; message: string }) => {
  return (
    <Card className="w-[28rem] shrink-0 rounded-xl duration-300 hover:shadow-md dark:bg-gradient-to-br dark:from-border/50 dark:to-background">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage alt={`Avatar of ${name}`} loading="lazy" />
            <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div>
            <CardTitle className="drop-shadow-2xl">{name}</CardTitle>
            <CardDescription>@{name.toLocaleLowerCase()}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-[15px] leading-5">{message}</p>
      </CardContent>
    </Card>
  );
};
