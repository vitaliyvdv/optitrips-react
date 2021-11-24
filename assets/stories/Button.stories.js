import { action } from "@storybook/addon-actions";

import Button from "../js/components/foundation/Button.js";
import "../sass/styles.scss";

export default {
  title: "Button",
  component: Button
};

export const PrimaryButton = () => <Button uppercase value='Button' onClick={action("clicked")} />;

PrimaryButton.story = {
  name: "Primary Button"
};

export const PrimaryButtonSmall = () => <Button uppercase size='sm' value='Button' onClick={action("clicked")} />;

PrimaryButtonSmall.story = {
  name: "Primary Button Small"
};

export const PrimaryButtonLarge = () => <Button uppercase size='lg' value='Button' onClick={action("clicked")} />;

PrimaryButtonLarge.story = {
  name: "Primary Button Large"
};

export const SecondaryButton = () => <Button color='secondary' uppercase value='Button' onClick={action("clicked")} />;

SecondaryButton.story = {
  name: "Secondary Button"
};

export const PrimaryIconButton = () => (
  <Button uppercase icon='date_range' value='Button' onClick={action("clicked")} />
);

PrimaryIconButton.story = {
  name: "Primary Button with Icon"
};

export const RaisedButton = () => <Button uppercase raised value='Button' onClick={action("clicked")} />;

RaisedButton.story = {
  name: "Raised Button"
};

export const OutlineButton = () => <Button uppercase outline value='Button' onClick={action("clicked")} />;

OutlineButton.story = {
  name: "Outline Button"
};

export const OutlineButtonSilver = () => (
  <Button uppercase outline color='silver' value='Button' onClick={action("clicked")} />
);

OutlineButtonSilver.story = {
  name: "Outline Button Silver"
};

export const OnlyIcon = () => <Button icon='date_range' onClick={action("clicked")} />;

OnlyIcon.story = {
  name: "Only Icon"
};

export const OnlyIconSmall = () => <Button size='sm' icon='date_range' onClick={action("clicked")} />;

OnlyIconSmall.story = {
  name: "Only Icon Small"
};

export const OnlyIconSmallTransparent = () => (
  <Button size='sm' color='transparent' icon='date_range' onClick={action("clicked")} />
);

OnlyIconSmall.story = {
  name: "Only Icon Small Transparent"
};

export const OnlyIconLarge = () => <Button size='lg' icon='date_range' onClick={action("clicked")} />;

OnlyIconLarge.story = {
  name: "Only Icon Large"
};

export const FloatingActionButtonSmall = () => <Button floating size='sm' icon='add' onClick={action("clicked")} />;

FloatingActionButtonSmall.story = {
  name: "Floating Action Button Small"
};

export const FloatingActionButton = () => <Button floating icon='add' onClick={action("clicked")} />;

FloatingActionButton.story = {
  name: "Floating Action Button"
};

export const FloatingActionButtonLarge = () => <Button floating size='lg' icon='add' onClick={action("clicked")} />;

FloatingActionButtonLarge.story = {
  name: "Floating Action Button Large"
};

export const LinkButton = () => <Button link uppercase value='Link button' onClick={action("clicked")} />;

LinkButton.story = {
  name: "Link Button"
};

export const LinkButtonDisabled = () => (
  <Button link disabled uppercase value='Link button' onClick={action("clicked")} />
);

LinkButtonDisabled.story = {
  name: "Link Button Disabled"
};

export const LinkButtonIcon = () => (
  <Button link uppercase icon='add' value='Link button' onClick={action("clicked")} />
);

LinkButtonIcon.story = {
  name: "Link Button with Icon"
};

export const DisabledButton = () => <Button uppercase disabled value='Button' onClick={action("clicked")} />;

DisabledButton.story = {
  name: "Disabled Button"
};
