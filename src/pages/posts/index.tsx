import React, { PureComponent } from 'react';

type State = {
    load: boolean,
}

class Index extends PureComponent<{}, State> {
    render() {
        return (
            <div>
                <h1>helo</h1>
            </div>
        )
    }
}

export default Index;
