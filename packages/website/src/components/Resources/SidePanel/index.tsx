import React, { useEffect, useRef } from 'react';
import '@ui5/webcomponents/dist/Icon.js'
import '@ui5/webcomponents/dist/Button.js'
import '@ui5/webcomponents/dist/Input.js'
import '@ui5/webcomponents/dist/Text.js'
import '@ui5/webcomponents/dist/Bar.js'
import '@ui5/webcomponents/dist/Panel.js'
import '@ui5/webcomponents/dist/Select.js'
import '@ui5/webcomponents/dist/Option.js'
import '@ui5/webcomponents/dist/Title.js'
import '@ui5/webcomponents-icons/dist/decline.js'
import '@ui5/webcomponents-fiori/dist/IllustratedMessage.js'
import '@ui5/webcomponents-fiori/dist/illustrations/AllIllustrations.js'

import './styles.css';


// @ts-ignore
export default function SidePanel({ children, open }) {
    const blockRef = useRef(null);
    const panelRef = useRef(null);

    useEffect(() => {
        const handle = setTimeout(() => {
            if (open) {
                blockRef.current?.showPopover();
                panelRef.current?.showPopover();
            } else {
                panelRef.current?.hidePopover();
                blockRef.current?.hidePopover();
            }
        }, 0);

        return () => clearTimeout(handle);
    }, [open]);

    return (
        <>
            <div id='block-layer' ref={blockRef} popover='manual'></div>
            <div id='panel' ref={panelRef} popover='manual'>
                {children}
            </div>
        </>
    );
}