import React from 'react';

import PropTypes from 'prop-types';

import { FileUploader } from 'components';

const FileUploaderContainer = ({ isFileUploaderModalOpen, onCloseFileUploaderModal, previewImageUrl }) => (
  <FileUploader
    isFileUploaderModalOpen={isFileUploaderModalOpen}
    onCloseFileUploaderModal={onCloseFileUploaderModal}
    previewImageUrl={previewImageUrl}
  />
);

FileUploaderContainer.propTypes = {
  isFileUploaderModalOpen: PropTypes.bool.isRequired,
  onCloseFileUploaderModal: PropTypes.func.isRequired,
  previewImageUrl: PropTypes.string
  // onFileUrlChange: PropTypes.func
};

export default FileUploaderContainer;
