export function BlueButton(props: React.JSX.IntrinsicElements["button"]) {
    const className = `border-blue-400 bg-white text-blue-400 border-2 rounded-md px-4 py-2 transition-colors duration-300 hover:bg-blue-400 hover:text-white`;
    return <button className={className} {...props} />;
}

export function RedButton(props: React.JSX.IntrinsicElements["button"]) {
    return <button className="border-red-400 bg-white text-red-400 border-2 rounded-md px-4 py-2 transition-colors duration-300 hover:bg-red-400 hover:text-white" {...props} />;

}