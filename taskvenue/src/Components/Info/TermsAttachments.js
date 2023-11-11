import React, { useEffect, useState } from 'react';
import supabase from '../../supabaseClient';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Input,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';

const TermsAttachments = () => {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const { t, i18n } = useTranslation();

  useEffect(() => {
        fetchDocuments();
  }, []);


  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase.storage.from('terms').list();
      if (error) {
        console.error('Błąd podczas pobierania plików z Supabase:', error);
      } else {
        setFiles(data);
        setFilteredFiles(data);
      }
    } catch (error) {
      console.error('Błąd podczas pobierania plików z Supabase:', error);
    }
  };

  const displayFile = async (file) => {
    const fileUrl = `${supabaseUrl}/storage/v1/object/public/terms/files/${file.name}`;
    window.open(fileUrl);
  };



  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('File Name')}</TableCell>
              <TableCell>{t('Actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFiles.map((file, index) => (
              <TableRow key={index}>
                <TableCell>{file.name}</TableCell>
                <TableCell>
                  <Button onClick={() => displayFile(file)}>{t('Display')}</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <p></p>

    </div>
  );
};

export default TermsAttachments;