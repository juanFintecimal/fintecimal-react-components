"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _arrayMove = require("array-move");

var _DropZone = _interopRequireDefault(require("../DropZone"));

var _FilePreview = _interopRequireDefault(require("../FilePreview"));

var _FileFinder = _interopRequireDefault(require("../FileFinder"));

var _DeleteDialog = _interopRequireDefault(require("./DeleteDialog"));

var _IneEditor = _interopRequireDefault(require("../IneEditor"));

var _style = _interopRequireDefault(require("./style"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('uuid'),
    uuidv4 = _require.v4;

var UploadDocuments = function UploadDocuments(_ref) {
  var title = _ref.title,
      multiple = _ref.multiple,
      accept = _ref.accept,
      onDrop = _ref.onDrop,
      onDelete = _ref.onDelete,
      onDeleteAll = _ref.onDeleteAll,
      onDownloadFile = _ref.onDownloadFile,
      onMove = _ref.onMove,
      useDeleteDialog = _ref.useDeleteDialog,
      placeholder = _ref.placeholder,
      url = _ref.url,
      disabled = _ref.disabled,
      required = _ref.required,
      useEditorIne = _ref.useEditorIne;
  var classes = (0, _style.default)();

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      file = _useState2[0],
      setFile = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      files = _useState4[0],
      setFiles = _useState4[1];

  var _useState5 = (0, _react.useState)(0),
      _useState6 = _slicedToArray(_useState5, 2),
      currentFile = _useState6[0],
      setCurrentFile = _useState6[1];

  var _useState7 = (0, _react.useState)(''),
      _useState8 = _slicedToArray(_useState7, 2),
      search = _useState8[0],
      setSearch = _useState8[1];

  var _useState9 = (0, _react.useState)(false),
      _useState10 = _slicedToArray(_useState9, 2),
      showModal = _useState10[0],
      setShowModal = _useState10[1];

  var _useState11 = (0, _react.useState)('1'),
      _useState12 = _slicedToArray(_useState11, 2),
      flipId = _useState12[0],
      setFlipId = _useState12[1];

  var titleRef = (0, _react.useRef)(null);
  var filteredFiles = (0, _react.useMemo)(function () {
    var searchLower = search.toLowerCase();
    return files.map(function (file) {
      var fileNameLower = file ? file.name.toLowerCase() : '';
      if (fileNameLower.includes(searchLower) || searchLower === '') return file;
      return null;
    }).filter(function (file) {
      return file !== null && file !== '';
    });
  }, [files, search]);
  /**
   * @returns {Array}
   */

  var deleteFile = function deleteFile() {
    var newFiles = _toConsumableArray(files);

    var index = newFiles.findIndex(function (_file) {
      return _file === file;
    });
    if (index !== -1) newFiles.splice(index, 1);
    return {
      newFiles: newFiles,
      index: index
    };
  };

  var deleteFileByIndex = function deleteFileByIndex() {
    var newFiles = _toConsumableArray(files);

    var index = newFiles.findIndex(function (_file) {
      return _file === file;
    });
    if (index !== -1) newFiles[index] = '';
    newFiles = newFiles.map(function (_file) {
      return _file === undefined ? '' : _file;
    });
    var filterFiles = newFiles.filter(function (_file) {
      return _file !== '';
    });
    return {
      newFiles: newFiles,
      index: index,
      filterFiles: filterFiles
    };
  };
  /**
   *
   * @param {Array} acceptedFiles 
   */


  var handleOnDrop = function handleOnDrop(acceptedFiles, rejectedFiles) {
    setFiles(acceptedFiles);
    setSearch('');
    onDrop(acceptedFiles, rejectedFiles);
  };

  var handleOnAdd = function handleOnAdd(acceptedFiles, rejectedFiles) {
    setFiles([].concat(_toConsumableArray(acceptedFiles), _toConsumableArray(files)));
    setSearch('');
    onDrop(acceptedFiles, rejectedFiles);
  };

  var handleOnDropByIndex = function handleOnDropByIndex(acceptedFiles, rejectedFiles, index) {
    var newValues = _toConsumableArray(files);

    if (acceptedFiles.length) newValues[index] = acceptedFiles[0];
    setFiles(newValues);
    onDrop(acceptedFiles, rejectedFiles);
  };

  var handleOnDelete = function handleOnDelete() {
    if (useEditorIne) {
      var _deleteFileByIndex = deleteFileByIndex(),
          newFiles = _deleteFileByIndex.newFiles,
          index = _deleteFileByIndex.index,
          filterFiles = _deleteFileByIndex.filterFiles;

      onDelete(filterFiles, file, index);
      setFiles(newFiles);
    } else {
      var _deleteFile = deleteFile(),
          _newFiles = _deleteFile.newFiles,
          _index = _deleteFile.index;

      onDelete(_newFiles, file, _index);
      setFiles(_newFiles);
    }

    setShowModal(false);
  };

  var moveCard = function moveCard(oldIndex, newIndex) {
    setFlipId(function (oldFlip) {
      return uuidv4();
    });
    setFiles(function (oldFiles) {
      return (0, _arrayMove.arrayMoveImmutable)(oldFiles, oldIndex, newIndex);
    });
    onMove(oldIndex, newIndex);
  };

  var handleOnDeleteAll = function handleOnDeleteAll() {
    onDeleteAll();
    setFiles([]);
    setShowModal(false);
  };

  var handleOnClick = function handleOnClick(index, file) {
    setFile(file);
    setCurrentFile(index);
    titleRef.current.scrollIntoView();
  };
  /**
   *
   * @param {String} text
   */


  var handleOnSearch = function handleOnSearch(text) {
    setSearch(text);
  };

  var generateFilesToURL =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(arrayUrl) {
      var _files, _files2, _file2;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return Promise.all(arrayUrl.map(
              /*#__PURE__*/
              function () {
                var _ref3 = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee(_url) {
                  var response, data, metadata, file;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return fetch(_url);

                        case 2:
                          response = _context.sent;
                          _context.next = 5;
                          return response.blob();

                        case 5:
                          data = _context.sent;
                          metadata = {
                            type: data.type
                          };
                          file = new File([data], title, metadata);
                          return _context.abrupt("return", file);

                        case 9:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x2) {
                  return _ref3.apply(this, arguments);
                };
              }()));

            case 3:
              _files = _context2.sent;
              _files2 = _slicedToArray(_files, 1), _file2 = _files2[0];
              if (_files) setFiles(_files);
              if (_file2) setFile(_file2);
              _context2.next = 12;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 9]]);
    }));

    return function generateFilesToURL(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var checkFiles = function checkFiles() {
    return files.filter(function (_file) {
      return _file !== '';
    }).length < 2;
  };

  var getTheDocument = function getTheDocument() {
    if (useEditorIne && checkFiles()) return _react.default.createElement(_IneEditor.default, {
      title: title,
      accept: accept,
      onChange: handleOnDropByIndex,
      values: files,
      disabled: disabled,
      handleOnDelete: useDeleteDialog ? function () {
        return setShowModal(true);
      } : handleOnDelete
    });else if (file) return _react.default.createElement(_FilePreview.default, {
      onDownloadFile: onDownloadFile,
      file: file,
      onDelete: useDeleteDialog ? function () {
        return setShowModal(true);
      } : handleOnDelete,
      disabled: disabled,
      urlDocument: url,
      multiple: multiple,
      accept: accept,
      onDrop: handleOnAdd
    });else return _react.default.createElement(_DropZone.default, {
      multiple: multiple,
      accept: accept,
      onDrop: handleOnDrop,
      disabled: disabled
    });
  };

  (0, _react.useEffect)(function () {
    setCurrentFile(0);
    if (filteredFiles.length > 0) setFile(filteredFiles[0]);else setSearch('');
  }, [filteredFiles]);
  (0, _react.useEffect)(function () {
    setCurrentFile(0);
    if (files.length <= 0) setFile(null);
  }, [files]);
  (0, _react.useEffect)(function () {
    var arrayUrl = url !== '' && typeof url === "string" ? [url] : url;
    if (Array.isArray(arrayUrl)) generateFilesToURL(arrayUrl);
  }, [url]);
  return _react.default.createElement("div", null, _react.default.createElement(_DeleteDialog.default, {
    onCancel: function onCancel() {
      return setShowModal(false);
    },
    onDelete: handleOnDelete,
    onDeleteAll: handleOnDeleteAll,
    title: "\xBFDeseas Borrar el/los documentos?",
    showModal: showModal && useDeleteDialog
  }), _react.default.createElement("div", {
    className: classes.titleContainer,
    ref: titleRef
  }, _react.default.createElement(_Typography.default, {
    className: classes.title
  }, title), required && _react.default.createElement(_Typography.default, {
    className: classes.asterisk
  }, "*")), getTheDocument(), multiple && files.length > 0 && _react.default.createElement(_FileFinder.default, {
    dragType: title,
    files: filteredFiles,
    current: currentFile,
    onClick: handleOnClick,
    search: search,
    onSearch: handleOnSearch,
    placeholder: placeholder,
    disabled: disabled || useEditorIne,
    multiple: multiple,
    accept: accept,
    onDrop: handleOnAdd,
    flipId: flipId,
    moveCard: moveCard
  }));
};

UploadDocuments.propTypes = {
  title: _propTypes.default.string,
  multiple: _propTypes.default.bool,
  url: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)]),
  accept: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)]),
  onDrop: _propTypes.default.func,
  onDelete: _propTypes.default.func,
  onDeleteAll: _propTypes.default.func,
  onDownloadFile: _propTypes.default.func,
  onMove: _propTypes.default.func,
  useDeleteDialog: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  required: _propTypes.default.bool,
  useEditorIne: _propTypes.default.bool
};
UploadDocuments.defaultProps = {
  title: '',
  multiple: false,
  accept: '',
  onDrop: function onDrop() {},
  onDelete: function onDelete() {},
  onDeleteAll: function onDeleteAll() {},
  onDownloadFile: function onDownloadFile() {},
  onMove: function onMove() {},
  useDeleteDialog: false,
  placeholder: '',
  url: '',
  disabled: false,
  required: false,
  useEditorIne: false
};
var _default = UploadDocuments;
exports.default = _default;