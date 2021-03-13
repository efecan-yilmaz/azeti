import { Dispatch, SetStateAction, createContext, useContext, ReactNode, useState } from 'react';

type SnackBarProps = {
    show: boolean;
    text: string;
    severity: any;
}

type IndicatorContextType = {
    showProgress: boolean;
    setShowProgress: Dispatch<SetStateAction<boolean>>;
    snackBar: SnackBarProps;
    setSnackBar: Dispatch<SetStateAction<SnackBarProps>>;
}


export const IndicatorContext = createContext<IndicatorContextType>({
    showProgress: false, 
    setShowProgress: () => {}, 
    snackBar: {show: false, text: '', severity: 'success'}, 
    setSnackBar: () => {}
});

export const useIndicator = () => useContext(IndicatorContext);

type IndicatorProviderProps = {
    children: ReactNode
}

const IndicatorProvider: React.FC<IndicatorProviderProps> = ({children}) => {
    const [showProgress, setShowProgress] = useState(false);
    const [snackBar, setSnackBar] = useState({show: false, text: '', severity: 'success'});

    return (
        <IndicatorContext.Provider value={{showProgress, setShowProgress, snackBar, setSnackBar}}>
            {children}
        </IndicatorContext.Provider>
    )
}

export default IndicatorProvider
