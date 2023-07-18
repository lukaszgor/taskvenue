import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import supabase from "../../supabaseClient";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Tasks from "../../Components/Manager/Tasks";
import WorkerTasks from "../../Components/Worker/WorkerTasks";
import ClientTasks from "../../Components/Client/ClientTasks";
import moment from "moment";

function Home() {

    const navigate = useNavigate();
    const [userID, setUserID] = useState('');
    const [isVerified, setIsVerified] = useState(null);
    const [licenseValidationDate, setLicenseValidationDate] = useState(null);
    const [date, setDate] = useState(null);
    

    useEffect(() => {
        const userIdFromLocalStorage = localStorage.getItem('userIdFromLocalStorage');
        if (userIdFromLocalStorage === null) {
            navigate('/');
        } else {
            setUserID(userIdFromLocalStorage);
            fetchData(userIdFromLocalStorage);
        }
    }, []);

    const fetchData = async (userId) => {
        const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select()
            .eq('id', userId)
            .single();

        if (profileError) {
            console.log(profileError);
        } else if (profileData) {
            setIsVerified(profileData.profile_type);
            localStorage.setItem('idConfiguration', profileData.id_configuration);

            const { data: configData, error: configError } = await supabase
                .from('configurations')
                .select('validity_date')
                .eq('id', profileData.id_configuration)
                .single();

            if (configError) {
                console.log(configError);
            } else if (configData) {
                setLicenseValidationDate(configData.validity_date);
            }
        }
    }

    // compare dates if date > licenseValidationDate
    useEffect(() => {
        if (date && licenseValidationDate) {
            const currentDate = moment(date, 'DD:MM:YYYY HH:mm');
            const licenseValidationDateParsed = moment(licenseValidationDate, 'DD:MM:YYYY HH:mm');
            if (currentDate.isAfter(licenseValidationDateParsed)) {
                console.log("no access licence");
                console.log(date)
                console.log(licenseValidationDate)
                SignOut()
            }
        }
    }, [date, licenseValidationDate]);

    // Set current date 
    useEffect(() => {
        const currentDate = moment().format('DD:MM:YYYY HH:mm');
        setDate(currentDate);
    }, []);


 const SignOut = async () => {
        localStorage.clear();
        const { user, error } = await supabase.auth.signOut();
        if (error) {
          console.log("Error with sign out");
        } else {
          navigate('/NoAccessLicence');
        }
      };

    return (
        <div>
            {isVerified === 'manager' && <Tasks />}
            {isVerified === 'worker' && <WorkerTasks />}
            {isVerified === 'client' && <ClientTasks />}
            {isVerified === null && (
                <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p></p>
                    <CircularProgress />
                </Box>
            )}
        </div>
    );
}

export default Home;


  