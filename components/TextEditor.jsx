'use client'

import dynamic from 'next/dynamic'
import {Box, Typography, Skeleton} from '@mui/material'
import {useMemo} from 'react'
import 'react-quill-new/dist/quill.snow.css'

// ❗ SSR-safe import (Next.js App Router)
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => (
    <Skeleton
      variant="rectangular"
      height={250}
    />
  ),
})

/**
 * @param {{
 *   value?: string,
 *   name: string,
 *   label?: string,
 *   helperText?: string,
 *   required?: boolean,
 *   disabled?: boolean,
 *   errorText?: string,
 *   touched?: boolean,
 *   onChange?: (e:{ target:{ name:string, value:string }})=>void,
 *   onBlur?: (e:{ target:{ name:string, value:string }})=>void,
 *   sx?: object
 * }} props
 */
export default function TextEditor({
  value,
  name,
  label,
  helperText,
  required,
  disabled,
  errorText,
  touched,
  onChange,
  onBlur,
  sx,
  ...restProps
}) {
  // Toolbar / modules should be memoized so Quill doesn't re-init
  const modules = useMemo(
    () => ({
      toolbar: [
        [{header: [1, 2, 3, 4, 5, 6, false]}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
        [{align: []}],
        ['link', 'image', 'video'],
        [{color: []}, {background: []}],
        ['clean'],
      ],
    }),
    []
  )

  // IMPORTANT: 'bullet' must NOT be in formats (Quill v2 changed),
  // just keep 'list'. Otherwise you'll get "Cannot register 'bullet'..." error.
  const formats = useMemo(
    () => [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'indent',
      'align',
      'link',
      'image',
      'video',
      'color',
      'background',
    ],
    []
  )

  return (
    <Box
      id={name}
      sx={{
        '& .quill': {
          background: (theme) => theme.palette.action.hover,
          '&:hover': {
            background: (theme) => theme.palette.action.focus,
          },
          '&:focus-within': {
            background: (theme) => theme.palette.action.hover,
          },
        },
        '& .ql-container': {
          borderRadius: '0 0 5px 5px',
          height: 'unset',
          border: 'none',
        },
        '& .ql-editor': {minHeight: '250px'},
        '& .ql-toolbar': {
          borderRadius: '5px 5px 0 0',
          border: 'none',
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        },
        // All toolbar icons/text color
        '& .ql-stroke': {
          stroke: (theme) => theme.palette.text.primary,
        },
        '& .ql-fill': {
          fill: (theme) => theme.palette.text.primary,
        },
        '& .ql-picker': {
          color: (theme) => theme.palette.text.primary,
        },
        // All toolbar icons/text hover color
        // '& .ql-stroke:hover': {
        //   stroke: 'rgba(0, 0, 0, 0.87)',
        // },
        // '& .ql-fill:hover': {
        //   fill: 'rgba(0, 0, 0, 0.87)',
        // },
        // '& .ql-picker:hover': {
        //   color: 'rgba(0, 0, 0, 0.87)',
        // },

        // Change placeholder color
        '& .ql-blank::before': {
          fontStyle: 'normal',
          fontSize: '0.875rem',
          color: (theme) => theme.palette.text.primary,
        },
        ...sx,
      }}
    >
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        placeholder={label}
        value={value}
        readOnly={disabled}
        onChange={(_, __, ___, editor) => {
          onChange?.({
            target: {
              name,
              value: editor.getHTML(), // or editor.getText() for plain text
            },
          })
        }}
        onBlur={(_range, _source, quill) => {
          onBlur?.({
            target: {
              name,
              value: quill.getHTML(),
            },
          })
        }}
        {...restProps}
      />

      <Typography
        variant="caption"
        sx={{pl: 2, color: errorText && touched ? '#d32f2f' : undefined}}
      >
        {errorText && touched ? errorText : helperText}
      </Typography>
    </Box>
  )
}
