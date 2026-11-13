import { ScrollyHero } from "@/components/scrollytelling/ScrollyHero";
import { StoryReel } from "@/components/scrollytelling/StoryReel";

/**
 * Above-the-fold story only.
 * Service chips / feature tiles lived here before but duplicated
 * ServicesSection + StoryReel messaging — kept out of the home path for focus.
 */
export function ScrollytellingExperience() {
  return (
    <>
      <ScrollyHero />
      <StoryReel />
    </>
  );
}
