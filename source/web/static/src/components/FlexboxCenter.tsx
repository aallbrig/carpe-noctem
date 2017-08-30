import * as React from 'react';

export const FlexboxCenter = ({ children }: React.HTMLProps<HTMLDivElement>) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }}>{ children }</div>
);

export default FlexboxCenter;
