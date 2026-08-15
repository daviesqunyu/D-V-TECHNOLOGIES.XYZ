import { ScrollyHero } from "@/components/scrollytelling/ScrollyHero";
import { StoryReel } from "@/components/scrollytelling/StoryReel";
import { DiagonalStrip } from "@/components/scrollytelling/DiagonalStrip";
import { FeatureTiles } from "@/components/scrollytelling/FeatureTiles";

export function ScrollytellingExperience() {
  return (
    <>
      <ScrollyHero />
      <StoryReel />
      <DiagonalStrip />
      <FeatureTiles />
    </>
  );
}
