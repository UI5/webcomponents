import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";

const Avatar = createReactComponent(AvatarClass);
const Label = createReactComponent(LabelClass);

function App() {

  return (
    <>
      <style>{`
            .example-row {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1rem;
            }
        `}</style>

        <div className="example-row">
            <Avatar mode="Decorative" initials="AB" />
            <Label>Decorative avatar with initials - not in accessibility tree</Label>
        </div>

        <div className="example-row">
            <Avatar mode="Image" initials="CD" />
            <Label>Image mode avatar (default) - announced as "Avatar CD"</Label>
        </div>

        <div className="example-row">
            <Avatar mode="Interactive" initials="EF" />
            <Label>Interactive mode - focusable with role="button"</Label>
        </div>
    </>
  );
}

export default App;
