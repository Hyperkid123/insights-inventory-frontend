import React from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    Split,
    SplitItem,
    Stack,
    StackItem,
    Level,
    LevelItem,
    Button,
    ClipboardCopy
} from '@patternfly/react-core';
import { ExclamationTriangleIcon } from  '@patternfly/react-icons';

const DeleteModal = ({ handleModalToggle, isModalOpen, currentSytem, onConfirm }) => {
    let systemToRemove;
    let systemLabel = 'system';
    if (Array.isArray(currentSytem)) {
        systemToRemove = currentSytem.length === 1 ? currentSytem[0].display_name : `${currentSytem.length} systems`;
        systemLabel = currentSytem.length === 1 ? systemLabel : 'systems';
    } else {
        systemToRemove = currentSytem.displayName;
    }

    return <Modal
        isSmall
        title="Remove from inventory"
        className="ins-c-inventory__table--remove"
        isOpen={isModalOpen}
        onClose={() => handleModalToggle(false)}
    >
        <Split gutter="md">
            <SplitItem><ExclamationTriangleIcon size="xl" className="ins-m-alert" /></SplitItem>
            <SplitItem isFilled>
                <Stack gutter="md">
                    <StackItem>
                        {systemToRemove} will be removed from
                                    all {location.host} applications and services. You need to re-register
                        the {systemLabel} to add it back to your inventory.
                    </StackItem>
                    <StackItem>
                        To disable the daily upload for this {systemLabel}, use the following command:
                    </StackItem>
                    <StackItem>
                        <ClipboardCopy>insights-client --unregister</ClipboardCopy>
                    </StackItem>
                </Stack>
            </SplitItem>
        </Split>
        <Level gutter="md">
            <LevelItem>
                <Button variant="danger" onClick={onConfirm}>
                    Remove
                </Button>
                <Button variant="link" onClick={() => handleModalToggle(false)}>Cancel</Button>
            </LevelItem>
        </Level>
    </Modal>;
};

const ActiveSystemProp = PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string
});

DeleteModal.propTypes = {
    isModalOpen: PropTypes.bool,
    currentSytem: PropTypes.oneOfType([ActiveSystemProp, PropTypes.arrayOf(ActiveSystemProp)]),
    handleModalToggle: PropTypes.func,
    onConfirm: PropTypes.func
};

DeleteModal.defaultProps = {
    isModalOpen: false,
    currentSytem: {},
    handleModalToggle: () => undefined,
    onConfirm: () => undefined
};

export default DeleteModal;