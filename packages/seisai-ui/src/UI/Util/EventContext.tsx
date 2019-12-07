import React, { FC, SyntheticEvent, DOMAttributes, ComponentType } from "react";

const handler = (event: SyntheticEvent) => {
  if (!event) {
    return;
  }

  event.stopPropagation();
};

const createProps = (propNames: Array<keyof DOMAttributes<any>>) =>
  propNames.reduce((p, propName) => ({ ...p, [propName]: handler }), {});

type EventContextProps = {
  Element?: ComponentType;
  handlers: Array<keyof DOMAttributes<any>>;
};

export const EventContext: FC<EventContextProps> = ({
  children,
  Element,
  handlers
}) =>
  Element ? (
    <Element {...createProps(handlers)}>{children}</Element>
  ) : (
    <div {...createProps(handlers)}>{children}</div>
  );
