'use client';

import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Box, useToast } from '@chakra-ui/react';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  height?: number;
}

export default function RichTextEditor({
  value,
  onChange,
  height = 400,
}: RichTextEditorProps) {
  const editorRef = useRef<any>(null);
  const toast = useToast();

  const handleImageUpload = async (blobInfo: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            // Convert the file to base64 and resolve with the data URL
            resolve(e.target.result as string);
          } else {
            reject('Failed to read file');
          }
        };
        reader.onerror = () => {
          reject('Failed to read file');
        };
        reader.readAsDataURL(blobInfo.blob());
      } catch (error) {
        reject('Image upload failed');
      }
    });
  };

  return (
    <Box borderRadius="md" overflow="hidden">
      <Editor
        apiKey="6lpke9o9871dk1w4ebru8konkbu2jp86xvmki9etd1ydm7le"
        value={value}
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        init={{
          height,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
            'image'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'image media | removeformat | help',
          content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 14px; }',
          skin: 'oxide',
          // Image upload settings
          images_upload_handler: handleImageUpload,
          automatic_uploads: true,
          file_picker_types: 'image',
          // Image editing features
          image_advtab: true,
          image_caption: true,
          image_dimensions: true,
          // Enable drag and drop for images
          paste_data_images: true,
          // Additional image settings
          image_title: true,
          image_description: true,
          image_uploadtab: true,
          // Menu bar settings
          menubar: 'file edit view insert format tools table help',
          menu: {
            file: { title: 'File', items: 'newdocument restoredraft | preview | export print | deleteallconversations' },
            edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace' },
            view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen' },
            insert: { title: 'Insert', items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
            format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat' },
            tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | code wordcount' },
            table: { title: 'Table', items: 'inserttable | cell row column | advtablesort | tableprops deletetable' },
          },
          // Enable automatic URLs paste cleanup
          convert_urls: false,
          // Remove MS Office generated CSS
          paste_remove_styles: true,
          // Strip MS Office meta data
          paste_remove_styles_if_webkit: true,
          // Custom CSS for the editor
          content_css: 'default',
          // Responsive behavior
          resize: true,
          statusbar: true,
          // Improved paste from Word
          paste_word_valid_elements: 'p,b,strong,i,em,h1,h2,h3,h4,h5,h6,ul,ol,li,img[src|alt|width|height]',
          // Better typing experience
          browser_spellcheck: true,
          contextmenu: 'link image table',
          // File size validation
          images_upload_validate_size: true,
          max_file_size: '5mb',
          // Image resize settings
          image_dimensions: true,
          image_class_list: [
            { title: 'None', value: '' },
            { title: 'Responsive', value: 'img-fluid' },
            { title: 'Thumbnail', value: 'img-thumbnail' }
          ],
          // Image toolbar
          image_toolbar: 'alignleft aligncenter alignright | rotateleft rotateright | imageoptions'
        }}
        onEditorChange={(content) => onChange(content)}
      />
    </Box>
  );
}
