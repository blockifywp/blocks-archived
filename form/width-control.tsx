import { __ } from "@wordpress/i18n";
import {
    ButtonGroup,
    Button
} from '@wordpress/components';

const defaults = {
    widths: [ 'auto', '25%', '50%', '75%', '100%' ],
    label: __( 'Width', 'blockify' ),
}

export const WidthControl = props => {
    const { width, setWidth, widths, label, onClick } = props;

    return (
        <ButtonGroup aria-label={ label ?? defaults.label }>
            { ( widths ?? defaults.widths ).map( key => {
                return (
                    <Button
                        key={ key }
                        isSmall={ true }
                        variant={
                            key === width ? 'primary' : undefined
                        }
                        value={ key }
                        onClick={ () => {
                            if ( key === width ) {
                                setWidth( 'auto' );
                            } else {
                                setWidth( key );
                            }

                            if ( onClick ) {
                                onClick( key );
                            }
                        } }
                    >
                        { key === 'auto' ? __( 'Auto', 'blockify' ) : key }
                    </Button>
                );
            } ) }
        </ButtonGroup>
    )
}

export default WidthControl;
