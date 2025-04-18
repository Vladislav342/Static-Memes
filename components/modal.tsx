import React from 'react';
import { Textarea, Input } from '@heroui/input';
import { Button } from '@heroui/button';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/modal';
import { IPropsData } from '@/types/IPropsData';
import { createToast } from '@/common/utils';

export const AlertModal = (props: IPropsData) => {
  const {
    isOpen,
    onOpenChange,
    moveProps,
    typeModal,
    setRemove,
    changeName,
    setChangeName,
    changeLink,
    setChangeLink,
    setEdit,
    setCreate,
    correctLink,
    setCorrectLink,
    correctTextarea,
    setCorrectTextarea,
    likes,
    setLikes,
    correctLikes,
    setCorrectLikes
  } = props;

  const returnJSX = () => (
    <>
      <Textarea
        value={changeName || ''}
        isRequired
        errorMessage="The description should be at least from 3 to 99 characters long."
        isInvalid={correctTextarea}
        className="max-w-auto"
        label="Name"
        labelPlacement="outside"
        placeholder="Name"
        onChange={e => {
          setChangeName(e.target.value);
          setCorrectTextarea(false);
        }}
      />
      <Input
        value={changeLink || ''}
        isRequired
        errorMessage="This field can't be empty and must start with http:// or https://"
        isInvalid={correctLink}
        className="max-w-auto"
        label="Link"
        labelPlacement="outside"
        placeholder="Link"
        onChange={e => {
          setChangeLink(e.target.value);
          setCorrectLink(false);
        }}
      />
      <Input
        value={isNaN(Number(String(likes))) ? '' : String(likes)}
        isRequired
        errorMessage="Likes must be from 0 to 99"
        isInvalid={correctLikes}
        className="max-w-auto"
        label="Likes"
        labelPlacement="outside"
        placeholder="Likes"
        onChange={e => {
          setLikes(Number(e.target.value));
          setCorrectLikes(false);
        }}
      />
    </>
  );

  const title = () => {
    switch (typeModal) {
      case 'Edit':
        return 'Edit The Current Mem';
      case 'Remove':
        return 'Remove The Current Mem';
      case 'Create':
        return 'Create A New Mem';
      default:
        return null;
    }
  };

  const modalBody = () => {
    switch (typeModal) {
      case 'Create':
        return returnJSX();
      case 'Edit':
        return returnJSX();
      case 'Remove':
        return (
          <h2 className="text-red-300">
            Are you sure you want to remove this Mem ?
          </h2>
        );
      default:
        return null;
    }
  };

  const buttonClick = () => {
    switch (typeModal) {
      case 'Edit':
        setEdit(true);
        break;
      case 'Remove':
        setRemove(true);
        break;
      case 'Create':
        setCreate(true);
        break;
      default:
        return null;
    }
  };

  return (
    <Modal
      backdrop={'blur'}
      size={'xl'}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader {...moveProps} className="flex flex-col gap-1">
              {title()}
            </ModalHeader>
            <ModalBody>
              <br />
              {modalBody()}
              <br />
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  setChangeName('');
                  setChangeLink('');
                  setLikes(0);
                  onClose();
                }}
              >
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  if (
                    (
                      changeName.length > 2 &&
                      changeName.length < 100 &&
                      (changeLink.startsWith('http://') || changeLink.startsWith('https://')) &&
                      likes >= 0 && 
                      likes < 100
                    ) ||
                    typeModal === 'Remove'
                  ) {
                    correctLink && setCorrectLink(false);
                    correctTextarea && setCorrectTextarea(false);
                    correctLikes && setCorrectLikes(false);
                    buttonClick();
                    onClose();
                  } else {
                    if (changeName.length < 3 || changeName.length > 99) setCorrectTextarea(true);                    
                    if (!changeLink || (!changeLink.startsWith('http://') && !changeLink.startsWith('https://'))) setCorrectLink(true);
                    if(likes < 0 || likes > 99) setCorrectLikes(true);

                    createToast({
                      title: 'Error',
                      desc: 'Please, fill in the fields correctly',
                      typeToast: 'danger',
                    });
                  }
                }}
              >
                {typeModal === 'Remove' ? 'Remove' : 'Save'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
