import React from 'react';
const kkeys = [],
    konami = '38,38,40,40,37,39,37,39,66,65';
class EasterEggProvider extends React.Component {
    validateInput(e) {
        kkeys.push(e.keyCode);
        if (kkeys.toString().indexOf(konami) >= 0) {
            document.removeEventListener('keydown', this.validateInput);
            this.setState({ accessCode: true });
        }
    }
    constructor(props) {
        super(props);
        this.state = { accessCode: false };
        this.validateInput = this.validateInput.bind(this);
    }
    componentDidMount() {
        document.addEventListener('keydown', this.validateInput);
    }
    render() {
        return this.state.accessCode ? <LinkProvider /> : null;
    }
}
export default EasterEggProvider;

class LinkProvider extends React.Component {
    followCursor(event) {
        const e = event || window.event;
        this.setState({ linkLeft: e.clientX + 10 + 'px', linkTop: e.clientY + 10 + 'px' });
    }
    constructor(props) {
        super(props);
        this.state = { linkLeft: 0, linkTop: 0 };
        this.followCursor = this.followCursor.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mousemove', this.followCursor);
    }
    componentWillUnmount() {
        document.removeEventListener('mousemove', this.followCursor);
    }
    linkContainerStyle() {
        return {
            position: 'fixed',
            left: this.state.linkLeft,
            top: this.state.linkTop,
            margin: 0,
            padding: 5,
            zIndex: 9999999
        };
    }
    render() {
        return <div className="uuddlrlrba" style={this.linkContainerStyle()} />;
    }
}

