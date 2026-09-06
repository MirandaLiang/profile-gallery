import type { Meta, StoryObj } from "@storybook/react";
import { ProfileGallery } from "./ProfileGallery";
import { profile, photos } from "./profile.data";
import "../../tokens/tokens.css";

const meta: Meta<typeof ProfileGallery> = {
  title: "Profile/ProfileGallery",
  component: ProfileGallery,
  parameters: { layout: "centered" },
  // Present the screen inside a phone frame — the frame is demo chrome only.
  decorators: [
    (Story) => (
      <div
        style={{
          width: 390,
          height: 844,
          borderRadius: 46,
          overflow: "hidden",
          boxShadow: "0 0 0 10px #1c1c1e, 0 0 0 11px #313135, 0 40px 90px -20px rgba(0,0,0,.85)",
          background: "#000",
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ProfileGallery>;

export const Default: Story = {
  args: {
    profile,
    photos,
    onFollow: () => console.log("follow"),
    onPhotoOpen: (p, i) => console.log("open", i, p.id),
  },
};

/** Empty state — no photos yet. */
export const Empty: Story = {
  args: { profile, photos: [] },
};
