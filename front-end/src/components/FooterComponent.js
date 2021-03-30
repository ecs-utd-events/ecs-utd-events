export default function FooterComponent({ page, ...otherProps }) {
    const backgroundCSSName = page === 'OrgProfilePage' ? 'App' : 'background';
    return (
        <footer className={backgroundCSSName} {...otherProps}>
<<<<<<< HEAD
            <div style={{ paddingTop: "3rem", paddingBottom: "1rem", paddingRight: "1rem", textAlign: "right" }}>
                (c) 2021 ecs.utdevents.com, MIT License. Open-source: <a href="https://github.com/ecs-utd-events/ecs-utd-events" target="_blank">contribute!</a> Created by <a href="https://mustafa-sadriwala.github.io/" target="_blank">MS</a>, <a href="https://www.linkedin.com/in/siddharth-naik" target="_blank">SN</a>, <a href="https://www.linkedin.com/in/jiwontopper" target="_blank">JT</a>, <a href="http://sid.devic.us/" target="_blank">SD</a>,
=======
            <div style={{ paddingTop: "3rem", paddingBottom: "2rem", paddingRight: "1rem", textAlign: "right", height: "2rem" }}>
                (c) 2021 MIT License. Open source: <a href="https://github.com/ecs-utd-events/ecs-utd-events" target="_blank">contribute!</a> Started by <a href="https://mustafa-sadriwala.github.io/" target="_blank">MS</a>, <a href="https://www.linkedin.com/in/siddharth-naik" target="_blank">SN</a>, <a href="https://www.linkedin.com/in/jiwontopper" target="_blank">JT</a>, <a href="http://sid.devic.us/" target="_blank">SD</a>,
>>>>>>> 1996772be05442fae0ee52e6a976e4655cc40d10
                and <a href="https://www.linkedin.com/in/shannen-barrameda">SB</a>.
            </div>
        </footer>
    );
}