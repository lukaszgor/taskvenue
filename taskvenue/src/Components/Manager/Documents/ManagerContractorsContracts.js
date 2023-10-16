import React, { useEffect, useState } from 'react';
import supabase from '../../../supabaseClient';
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

const ManagerContractorsContracts = () => {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [fileToUpload, setFileToUpload] = useState(null);
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const [idConfig, setIdConfiguration] = useState('');
  const { id } = useParams();
  const [userID, setUserID] = useState('');
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (idConfig) {
        fetchDocuments();
    }
  }, [idConfig]);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setUserID(data.session.user.id);
        fetchData(data.session.user.id);
      }
    };
    checkSession();
  }, []);

  const fetchData = async (userId) => {
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id_configuration')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.log(profileError);
    } else if (profileData) {
      setIdConfiguration(profileData.id_configuration);
    }
  };

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase.storage.from('contracts').list(idConfig + '/' + id + '/');
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
    const fileUrl = `${supabaseUrl}/storage/v1/object/public/contracts/${idConfig}/${id}/${file.name}`;
    window.open(fileUrl);
  };

  const uploadAndProcessFile = async () => {
    if (fileToUpload) {
      try {
        const { data: fileData, error: fileError } = await supabase.storage
          .from('contracts')
          .upload(idConfig + '/' + id + '/' + fileToUpload.name, fileToUpload);
        if (fileError) {
          console.error('Błąd podczas przesyłania pliku:', fileError);
        } else {
          // Handle success
          fetchDocuments(); // Refresh the file list
        }
      } catch (error) {
        console.error('Błąd podczas przesyłania pliku:', error);
      }
    }
  };

  const deleteFile = async (file) => {
    try {
      const { error } = await supabase.storage
        .from('contracts')
        .remove([idConfig + '/' + id + '/' + file.name]);
      if (error) {
        console.error('Błąd podczas usuwania pliku:', error);
      } else {
        fetchDocuments(); // Refresh the file list
      }
    } catch (error) {
      console.error('Błąd podczas usuwania pliku:', error);
    }
  };

  return (
    <div>
      <h2>{t('Contracts')}</h2>
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
                  <Button color="error" onClick={() => deleteFile(file)}>{t('Delete')}</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <p></p>
      <Box display="flex" justifyContent="space-between">
        <FormControl fullWidth style={{ width: '50%' }}>
          <input type="file" onChange={(e) => setFileToUpload(e.target.files[0])} />
        </FormControl>
        <Button onClick={uploadAndProcessFile}>{t('Send')}</Button>
      </Box>
    </div>
  );
};

export default ManagerContractorsContracts;
