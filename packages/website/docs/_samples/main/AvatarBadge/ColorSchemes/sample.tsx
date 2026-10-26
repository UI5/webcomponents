import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents-icons/dist/employee.js";
import AvatarBadgeClass from "@ui5/webcomponents/dist/AvatarBadge.js";

const Avatar = createReactComponent(AvatarClass);
const AvatarBadge = createReactComponent(AvatarBadgeClass);

const schemes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] as const;

function App() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
      {schemes.map((scheme) => (
        <Avatar key={scheme} size="M" initials={`A${scheme}`}>
          <AvatarBadge icon="employee" colorScheme={scheme} slot="badge"></AvatarBadge>
        </Avatar>
      ))}
    </div>
  );
}

export default App;
