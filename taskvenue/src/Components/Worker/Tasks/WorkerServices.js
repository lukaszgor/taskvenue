import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Grid,
    Container,
    Typography,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Card,
    CardContent,
    CardActions,
    Switch, FormControlLabel
} from '@mui/material';
import supabase from '../../../supabaseClient';
import { useParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from 'styled-components';
import { format } from 'date-fns';
import SellIcon from '@mui/icons-material/Sell';

const DateInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
`;

function WorkerServices() {
    const { t, i18n } = useTranslation();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState(0);
    const [unit, setUnit] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);
    const [fullTotalTask, setFullTotalTask] = useState(0);
    const [dictionaryServices, setDictionaryServices] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [service, setService] = useState(null);
    const [selectedDateTime, setSelectedDateTime] = useState('');
    const { id } = useParams();
    const [status, setStatus] = useState('');

    const [userID, setUserID] = useState('');
    const [idConfig, setIdConfiguration] = useState('');

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

    const handleFetchDataStatus = async (idConfig, id) => {
        const { data, error } = await supabase
            .from('tasks')
            .select('status')
            .eq('id', id)
            .eq('id_configuration', idConfig)
            .single();
        if (error) {
            console.log(error);
        }
        if (data) {
            setStatus(data.status);
        }
    };

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

    const handleDateTimeChange = (event) => {
        setSelectedDateTime(event.target.value);
    };

    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        if (selectedDateTime) {
            const formattedDate = format(new Date(selectedDateTime), 'dd/MM/yyyy HH:mm');
            setFormattedDate(formattedDate);
        }
    }, [selectedDateTime]);

    const handleFetchDictionaryServices = async (idConfig) => {
        const { data, error } = await supabase
            .from('service_dictionary')
            .select()
            .eq('id_configuration', idConfig);
        if (error) {
            console.log(error);
        }
        if (data) {
            setDictionaryServices(data);
        }
    };

    useEffect(() => {
        if (idConfig) {
            fetchServices(idConfig, id);
            handleFetchDictionaryServices(idConfig);
            handleFetchDataStatus(idConfig, id);
        }
    }, [idConfig, id]);

    useEffect(() => {
        const calculatedTotal = cost * quantity;
        setTotal(calculatedTotal);
    }, [cost, quantity]);

    useEffect(() => {
        if (service) {
            const calculatedFullTotal = service.reduce((acc, serviceItem) => acc + serviceItem.total, 0);
            setFullTotalTask(calculatedFullTotal);
        }
    }, [service]);

    const handleSubmit = (event) => {
        event.preventDefault();
        insertService();
    };

    const DeleteService = async (event, cellValues) => {
        const { data, error } = await supabase.from('services').delete().eq('id', cellValues.id);
        handleClickAlert();
        fetchServices(idConfig, id);
        if (error) {
            console.log(error);
        }
        if (data) {
        }
    };

    // Funkcja obsługująca zmianę stanu przełącznika "execution" w karcie usługi
    const handleExecutionToggle = async (serviceItem) => {
        const newExecutionValue = serviceItem.execution === 1 ? null : 1;
        // Update the database with the new execution value
        const { data, error } = await supabase
            .from('services')
            .update({ execution: newExecutionValue })
            .eq('id', serviceItem.id);
        fetchServices(idConfig, id);
        if (error) {
            console.log(error);
        }
        if (data) {
            // Update the local state
            const updatedService = service.map((item) =>
                item.id === serviceItem.id ? { ...item, execution: newExecutionValue } : item
            );
            setService(updatedService);

        }
    };

    const insertService = async () => {
        const { data, error } = await supabase
            .from('services')
            .insert([
                {
                    id_configuration: idConfig,
                    name: name,
                    cost: cost,
                    description: description,
                    unit: unit,
                    quantity: quantity,
                    total: total,
                    idTask: id,
                    user_id: userID,
                    date: formattedDate
                },
            ]);
        handleClickAlert();
        fetchServices(idConfig, id);
        if (error) {
            console.log(error);
        }
        if (data) {
            setName('');
            setDescription('');
            setUnit('');
            setCost(0);
            setQuantity(1);
            setTotal(0);
        }
    };

    const fetchServices = async (idConfiguration, id) => {
        const { data, error } = await supabase
            .from('services')
            .select(`*,
      profiles:profiles(username) as profiles_username
            `)
            .eq('idTask', id)
            .eq('id_configuration', idConfiguration);
        if (error) {
            console.log(error);
            setService(null);
            setFetchError(t('No services'));
        }
        if (data) {
            setService(data);
            setFetchError(null);
        }
    };

    const handleServiceDictionary = (event) => {
        const value = event.target.value;
        setName(value.name);
        setDescription(value.description);
        setUnit(value.unit);
        setCost(value.cost);
        setQuantity(1);
    };

    const [open, setOpen] = useState(null);

    const handleClickAlert = () => {
        setOpen(true);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const determineSwitchState = (execution) => {
        return execution === 1 ? true : false;
    };

    const columns = [
        { field: 'name', headerName: t('Name'), width: 250 },
        { field: 'description', headerName: t('Description'), width: 400 },
        { field: 'cost', headerName: t('Cost'), width: 70 },
        { field: 'quantity', headerName: t('Quantity'), width: 70 },
        { field: 'unit', headerName: t('Unit'), width: 100 },
        { field: 'total', headerName: t('Total'), width: 70 },
        { field: 'date', headerName: t('Date'), width: 140 },
        {
            field: 'profiles.username',
            headerName: t('User'),
            width: 140,
            renderCell: (params) => {
                return <span>{params.row.profiles.username}</span>;
            },
        },
        {
            field: 'Action',
            headerName: t('Action'),
            width: 100,
            renderCell: (cellValues) => {
                return (
                    <Button
                        color="error"
                        onClick={(event) => {
                            DeleteService(event, cellValues);
                        }}
                    >
                        {t('Delete')}
                    </Button>
                );
            },
        },
    ];

    return (
        <div>
            <div>
                <p></p>
                <div>
                    {fetchError && <p>{fetchError}</p>}
                    {service && (
                        <div style={{ textAlign: 'right' }}>
                            <div>
                                <Typography variant="h6">
                                    {t('Summary')}: {fullTotalTask} <SellIcon fontSize="medium" />
                                </Typography>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" fontWeight="bold">
                        {t('Add')}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography></Typography>
                    <form
                        onSubmit={handleSubmit}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Container maxWidth="md">
                            <Typography variant="h4" align="center" gutterBottom>
                                <p></p>
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="distionary-select-label">{t('Select service from dictionary')}</InputLabel>
                                        <Select
                                            labelId="asigned-select-label"
                                            id="distionary-select"
                                            onChange={handleServiceDictionary}
                                            label={t('Select service from dictionary')}
                                        >
                                            {dictionaryServices.map((dictionaryServices) => (
                                                <MenuItem key={dictionaryServices.id} value={dictionaryServices}>
                                                    {dictionaryServices.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label={t('Name')}
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        style={{ marginRight: '10px' }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label={t('Cost')}
                                        value={cost}
                                        onChange={(event) => setCost(event.target.value)}
                                        style={{ marginRight: '10px' }}
                                        type="number"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label={t('Unit')}
                                        value={unit}
                                        onChange={(event) => setUnit(event.target.value)}
                                        style={{ marginRight: '10px' }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label={t('Quantity')}
                                        value={quantity}
                                        onChange={(event) => setQuantity(event.target.value)}
                                        style={{ marginRight: '10px' }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label={t('Total')}
                                        value={total}
                                        style={{ marginRight: '10px' }}
                                        fullWidth
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <label>{t('Date')}</label>
                                    <DateInput
                                        type="datetime-local"
                                        value={selectedDateTime}
                                        onChange={handleDateTimeChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label={t('Description')}
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                        style={{ marginRight: '10px' }}
                                        fullWidth
                                        multiline
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" justifyContent="flex-end">
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            disabled={status === 'completed'}
                                            color="primary"
                                            style={{ minWidth: 'auto' }}
                                        >
                                            {t('Submit')}
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                            <div></div>
                            <Snackbar open={open} autoHideDuration={2000} onClose={handleCloseAlert}>
                                <Alert severity="success">{t('Updated!')}</Alert>
                            </Snackbar>
                        </Container>
                    </form>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" fontWeight="bold">{t('Services')}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Container maxWidth="md">
                        <div>
                            {fetchError && <p>{fetchError}</p>}
                            {service && (
                                <div>
                                    <p> </p>
                                    <Grid container spacing={2}>
                                        {service.map((serviceItem) => (
                                            <Grid item xs={12} sm={6} md={12} lg={12} key={serviceItem.id}>
                                                <Card>
                                                    <CardContent>
                                                        <Grid container alignItems="center" justifyContent="space-between">
                                                            <Typography variant="h6">{serviceItem.name}</Typography>
                                                        </Grid>
                                                        <Typography variant="body2">{serviceItem.description}</Typography>
                                                        <Typography variant="body2">{t('Cost')}: {serviceItem.cost}</Typography>
                                                        <Typography variant="body2">{t('Quantity')}: {serviceItem.quantity}</Typography>
                                                        <Typography variant="body2">{t('Unit')}: {serviceItem.unit}</Typography>
                                                        <Typography variant="body2">{t('Total')}: {serviceItem.total}</Typography>
                                                        <Typography variant="body2">{t('Date')}: {serviceItem.date}</Typography>
                                                    </CardContent>
                                                    <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Button
                                                            color="error"
                                                            onClick={(event) => {
                                                                DeleteService(event, serviceItem);
                                                            }}
                                                        >
                                                            {t('Delete')}
                                                        </Button>
                                                        <FormControlLabel
                                                            value={t('Completed')}
                                                            label={t('Completed')}
                                                            labelPlacement="start"
                                                            control={<Switch
                                                                checked={determineSwitchState(serviceItem.execution)}
                                                                color="primary"
                                                                name="execution"
                                                                onChange={() => handleExecutionToggle(serviceItem)}
                                                            />}
                                                        />
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </div>
                            )}
                        </div>
                    </Container>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default WorkerServices;
