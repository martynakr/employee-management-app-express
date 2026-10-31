import H1 from "./H1";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
    title: "Components/Typography/H1",
    component: H1,
    tags: ["autodocs"],
    args: {
        children: "Hello world",
    },
    argTypes: {
        className: {
            control: "select",
            options: [
                "",
                "text-primary",
                "text-navy",
                "text-text-main",
                "text-text-muted",
                "text-body",
                "text-heading",
            ],
        },
        children: {
            control: "text",
        },
    },
    decorators: [
        (Story) => (
            <div className="w-64">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof H1>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
    args: { className: "text-primary" },
};

export const Navy: Story = {
    args: { className: "text-navy" },
};

export const Muted: Story = {
    args: { className: "text-text-muted" },
};
