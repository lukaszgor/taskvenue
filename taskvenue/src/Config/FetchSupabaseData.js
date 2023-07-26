import React from 'react';
import supabase from '../supabaseClient';
import { useState,useEffect } from 'react';

const FetchSupabaseData = ({ sendData}) => {
  const [userId, setuserID] = useState('');
  const [idConfiguration, setIdConfiguration] = useState('');
  const [profileType, setProfileType] = useState('');

      useEffect(() => {
          const checkSession = async () => {
              const { data } = await supabase.auth.getSession();
              if (data.session) {
               setuserID(data.session.user.id)
               fetchData(data.session.user.id)
              }
            };
            checkSession();
        });
        const fetchData = async (userId) => {
          const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select()
              .eq('id', userId)
              .single();
  
          if (profileError) {
              console.log(profileError);
          } else if (profileData) {
              setProfileType(profileData.profile_type);
              setIdConfiguration(profileData.id_configuration);
              sendData(userId, idConfiguration, profileType);
          }
      }
  
  return (
    <div>
    
    </div>
  );
};

export default FetchSupabaseData;