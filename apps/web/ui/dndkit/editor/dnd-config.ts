import {
    MeasuringConfiguration,
    MeasuringStrategy,
    DropAnimation,
    defaultDropAnimationSideEffects
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export const measuring: MeasuringConfiguration = {
    droppable: {
        strategy: MeasuringStrategy.Always,
    },
};

export const dropAnimation: DropAnimation = {
    keyframes({ transform }) {
        return [
            { transform: CSS.Transform.toString(transform.initial) },
        ];
    },
    sideEffects: defaultDropAnimationSideEffects({
        className: {
            //   active: pageStyles.active,
        },
    }),
};


export function always() {
    return true;
}
