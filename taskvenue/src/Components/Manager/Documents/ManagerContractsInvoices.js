import React, { useEffect, useState } from 'react';
import supabase from '../../../supabaseClient';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ManagerContractsInvoices = () => {
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
      fetchInvoices();
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

  const fetchInvoices = async () => {
    try {
      // Dodaj parametr "path" aby pobrać tylko pliki z folderu "1" w "invoices"
      // const { data, error } = await supabase.storage.from('invoices').list('2'+'/');
      const { data, error } = await supabase.storage.from('invoices').list(idConfig+'/'+id+'/');
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
    const fileUrl = `${supabaseUrl}/storage/v1/object/public/invoices/${idConfig}/${id}/${file.name}`;
    window.open(fileUrl);
  };

  const uploadAndProcessFile = async () => {
    if (fileToUpload) {
      try {
        const { data: fileData, error: fileError } = await supabase.storage
          .from('invoices')
          .upload(idConfig+"/"+id+"/"+fileToUpload.name, fileToUpload);
        if (fileError) {
          console.error('Błąd podczas przesyłania pliku:', fileError);
        } else {
          // co zrobik
        
        }
      } catch (error) {
        console.error('Błąd podczas przesyłania pliku:', error);
      }
    }
  };

  return (
    <div>
      <h2>{t('Invoices')}</h2>
      <ul>
        {filteredFiles.map((file, index) => (
          <li key={index}>
            {file.name} {' '}
            <button onClick={() => displayFile(file)}>{t('Display')}</button>
          </li>
        ))}
      </ul>
      <input type="file" onChange={(e) => setFileToUpload(e.target.files[0])} />
      <button onClick={uploadAndProcessFile}>{t('Send')}</button>
    </div>
  );
};

export default ManagerContractsInvoices;
