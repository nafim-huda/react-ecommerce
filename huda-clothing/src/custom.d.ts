// Import any files that abide by the following rules in the {}
declare module "*.svg" {
    // we need the ReactComponent as a valid variable/functional component, so we can alias it with our Shopping-Bag.svg
    import React = require("react");
    // this ReactComponent's type must be of type FC<SVG> and we need to pass in the SVGProps incase our SVG has props
    export const ReactComponent: React.FC<SVGProps<SVGSVGElement>>;
    // all files get converted to strings -> we want to export our the file as a string
    const src: string;
    export default src;
}