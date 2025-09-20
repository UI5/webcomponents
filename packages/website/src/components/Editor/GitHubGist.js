import React from "react";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Button.js";
import CopyIcon from "@ui5/webcomponents-icons/dist/v5/copy.js";
import GithubIcon from "@ui5/webcomponents-icons-tnt/dist/github.js";

export default function GitHubGist({
  githubUser,
  isAuthenticating,
  isCreatingGist,
  gistUrl,
  onSignIn,
  onSignOut,
  onCreateGist,
  onCopyGistUrl,
  setCopied
}) {
  const handleCopyGistUrl = async () => {
    try {
      await onCopyGistUrl(gistUrl);
      setCopied(true);
    } catch (error) {
      console.error("failed to copy to clipboard:", error);
    }
  };

  return (
    <div>
      <ui5-label style={{ marginTop: "1rem" }}>GitHub Gist</ui5-label>
      
      {!githubUser ? (
        <div style={{ textAlign: "center", padding: "1rem 0" }}>
          <ui5-button 
            onClick={onSignIn}
            disabled={isAuthenticating ? true : undefined}
            style={{ width: "100%" }}
            icon={GithubIcon}
          >
            {isAuthenticating ? "Signing in..." : "Sign in with GitHub"}
          </ui5-button>
        </div>
      ) : (
        <div>
          {gistUrl ? (
            <div>
              <div style={{ 
                display: "flex", 
                gap: "0.5rem", 
                alignItems: "center", 
                marginBottom: "0.5rem" 
              }}>
                <ui5-input readonly value={gistUrl}></ui5-input>
                <ui5-button
                  icon={CopyIcon}
                  design="Transparent"
                  onClick={handleCopyGistUrl}
                ></ui5-button>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <ui5-button 
                onClick={onCreateGist}
                disabled={isCreatingGist ? true : undefined}
                icon={GithubIcon}
              >
                {isCreatingGist ? "Creating Gist..." : "Create GitHub Gist"}
              </ui5-button>

              <ui5-button
                design="Transparent"
                onClick={onSignOut}
              >
                Sign out
              </ui5-button>
            </div>
          )}
          
          <span style={{ 
            fontSize: "0.8rem", 
            color: "var(--sapSuccessColor)" 
          }}>
            ✓ Signed in as {githubUser.login} 
            {githubUser.avatar_url && (
              <img 
                src={githubUser.avatar_url} 
                alt="avatar" 
                style={{ 
                  width: "1.5rem", 
                  height: "1.5rem", 
                  borderRadius: "50%", 
                  verticalAlign: "middle", 
                  marginLeft: "0.5rem" 
                }} 
              />
            )}
          </span>
        </div>
      )}
    </div>
  );
}
