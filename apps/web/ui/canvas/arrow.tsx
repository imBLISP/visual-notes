import {
  TLBaseShape,
  HTMLContainer,
  ShapeUtil,
  Rectangle2d,
  Geometry2d,
  TLOnResizeHandler,
  resizeBox,
  RecordProps,
  T,
} from "@tldraw/tldraw";

type CustomArrowShape = TLBaseShape<
  "custom-arrow",
  {
    w: number;
    h: number;
    text: string;
  }
>;

export class CustomArrowShapeUtil extends ShapeUtil<CustomArrowShape> {
  // [a]
  static override type = "custom-arrow" as const;
  static override props: RecordProps<CustomArrowShape> = {
    w: T.number,
    h: T.number,
    text: T.string,
  };

  // [b]
  getDefaultProps(): CustomArrowShape["props"] {
    return {
      w: 200,
      h: 200,
      text: "I'm a shape!",
    };
  }

  // [c]
  override canEdit = () => false;
  override canResize = () => true;
  override isAspectRatioLocked = () => false;

  // [d]
  getGeometry(shape: CustomArrowShape): Geometry2d {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    });
  }

  // [e]
  override onResize: TLOnResizeHandler<any> = (shape, info) => {
    return resizeBox(shape, info);
  };

  // [f]
  component(shape: CustomArrowShape) {
    return (
      <HTMLContainer style={{ backgroundColor: "#efefef" }}>
        {shape.props.text}
      </HTMLContainer>
    );
  }

  // [g]
  indicator(shape: CustomArrowShape) {
    return <rect width={shape.props.w} height={shape.props.h} />;
  }
}
