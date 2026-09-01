import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents-icons/dist/employee.js";
import AvatarBadgeClass from "@ui5/webcomponents/dist/AvatarBadge.js";

const Avatar = createReactComponent(AvatarClass);
const AvatarBadge = createReactComponent(AvatarBadgeClass);

const accents = ["Accent1", "Accent2", "Accent3", "Accent4", "Accent5", "Accent6", "Accent7", "Accent8", "Accent9", "Accent10"] as const;

function App() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
      {accents.map((scheme) => (
        <Avatar key={scheme} mode="Interactive" size="M" initials={scheme.replace("Accent", "A")} colorScheme={scheme}>
          <AvatarBadge icon="employee" colorScheme={scheme} slot="badge"></AvatarBadge>
        </Avatar>
      ))}
    </div>
  );
}

export default App;
