export default function FooterComponent({ page, ...otherProps }) {
    const backgroundCSSName = page === 'OrgProfilePage' ? 'App' : 'background';
    return (
        <footer className={backgroundCSSName} {...otherProps}>
            <div style={{ paddingTop: "3rem", paddingBottom: "1rem", paddingRight: "1rem", textAlign: "right" }}>
                (c) 2021 ecs-utd-events, MIT License. Open-source: <a href="https://github.com/ecs-utd-events/ecs-utd-events" target="_blank">contribute!</a> Created by <a href="https://mustafa-sadriwala.github.io/" target="_blank">MS</a>, <a href="https://www.linkedin.com/in/siddharth-naik-1a90b2159/" target="_blank">SN</a>, <a href="https://www.linkedin.com/in/jiwontopper" target="_blank">JT</a>, <a href="http://sid.devic.us/" target="_blank">SD</a>,
                and <a href="https://www.linkedin.com/in/shannen-barrameda">SB</a>.
            </div>
        </footer>
    );
}