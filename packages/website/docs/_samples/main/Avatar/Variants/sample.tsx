import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import AvatarBadgeClass from "@ui5/webcomponents/dist/AvatarBadge.js";
import "@ui5/webcomponents-icons/dist/edit.js";

const Avatar = createReactComponent(AvatarClass);
const AvatarBadge = createReactComponent(AvatarBadgeClass);

function App() {
  const handleInteractiveAvtClick = () => {
    console.log("Interactive avatar clicked");
  };

  const handlePopupAvtClick = () => {
    console.log("Avatar with popup clicked - menu would open here");
  };

  return (
    <>
      <style>{`
        .avatar-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding: 1rem;
        }
        .variant-group {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .variant-description {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .variant-title {
          font-weight: bold;
          font-size: 0.875rem;
        }
        .variant-note {
          font-size: 0.75rem;
          color: var(--sapTextColor-Muted);
        }
      `}</style>
      <div className="avatar-container">
        {/* Non-interactive Avatar */}
        <div className="variant-group">
          <Avatar size="M" initials="AB" colorScheme="Accent1" />
          <div className="variant-description">
            <div className="variant-title">Non-interactive Avatar</div>
            <div className="variant-note">Decorative with initials - no interaction</div>
          </div>
        </div>

        {/* Non-interactive with Image */}
        <div className="variant-group">
          <Avatar size="M">
            <img src="/images/avatars/woman_avatar_1.png" alt="Woman Avatar" />
          </Avatar>
          <div className="variant-description">
            <div className="variant-title">Non-interactive Avatar with Image</div>
            <div className="variant-note">Image-based avatar - no interaction</div>
          </div>
        </div>

        {/* Interactive Avatar */}
        <div className="variant-group">
          <Avatar id="interactive-avt" size="M" mode="Interactive" initials="CD" colorScheme="Accent3" onClick={handleInteractiveAvtClick} />
          <div className="variant-description">
            <div className="variant-title">Interactive Avatar</div>
            <div className="variant-note">Clickable - supports user interaction and callbacks</div>
          </div>
        </div>

        {/* Interactive Avatar with Badge */}
        <div className="variant-group">
          <Avatar size="M" mode="Interactive" initials="EF" colorScheme="Accent5">
            <AvatarBadge icon="edit" state="None" slot="badge" />
          </Avatar>
          <div className="variant-description">
            <div className="variant-title">Interactive Avatar with Badge</div>
            <div className="variant-note">Badge recommended on interactive avatars</div>
          </div>
        </div>

        {/* Interactive Avatar with Popup */}
        <div className="variant-group">
          <Avatar
            id="popup-avt"
            size="M"
            mode="Interactive"
            initials="GH"
            colorScheme="Accent7"
            aria-label="User profile - click to open menu"
            aria-haspopup="menu"
            onClick={handlePopupAvtClick}
          />
          <div className="variant-description">
            <div className="variant-title">Interactive Avatar with Popup Menu</div>
            <div className="variant-note">Indicates menu availability via aria-haspopup</div>
          </div>
        </div>

        {/* Decorative Avatar */}
        <div className="variant-group">
          <Avatar size="M" initials="IJ" role="presentation" />
          <div className="variant-description">
            <div className="variant-title">Decorative Avatar</div>
            <div className="variant-note">Purely visual - hidden from screen readers</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
