export function getStyledButton(primary: string, background: string) {
    const className =
        `border-${primary} bg-${background} text-${primary} border-2 rounded-md px-4 py-2 transition-colors duration-300 hover:bg-${primary} hover:text-${background}`;

    //Closure
    const StyledButton = (props: React.JSX.IntrinsicElements["button"]) => {
        return <button className={className}
            {...props}
        />
    }


    return StyledButton;
}
