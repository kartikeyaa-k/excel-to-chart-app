import React, { useState } from 'react';
import { readExcelFile } from '../utils/fileUtils.js';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend } from 'chart.js';
import { Paper, Button, Box } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { CHART_COLORS, TOOLTIP_MESSAGES, APP_LABELS } from '../config/config';
import '../styles/LineChartWithUpload.css';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Legend);

/**
 * A component that allows users to upload an Excel file and displays its data as a line chart.
 *
 * @component
 * @example
 * return (
 *   <LineChartWithUpload />
 * );
 */
const LineChartWithUpload = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    /**
     * Handles the file upload event, reads the Excel file, and updates the chart data.
     *
     * @param {Event} event - The file input change event.
     * @returns {Promise<void>}
     */
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const { labels, values } = await readExcelFile(file);
            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Line Chart',
                        data: values,
                        fill: false,
                        borderColor: CHART_COLORS.borderColor,
                        tension: 0.1,
                        borderWidth: 2,
                    }
                ]
            });
        }
    };

    return (
        <Paper className="paper-container">
            <Box className="upload-container">
                <Button
                    variant="contained"
                    component="label"
                    startIcon={<FileUploadIcon />}
                    className="upload-button"
                >
                    {APP_LABELS.uploadButton}
                    <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} hidden />
                </Button>
                <Tooltip title={TOOLTIP_MESSAGES.uploadInfo} placement="right">
                    <IconButton sx={{ marginLeft: 1 }}>
                        <InfoIcon sx={{ color: CHART_COLORS.borderColor }} />
                    </IconButton>
                </Tooltip>
            </Box>
            <Box className="chart-container">
                <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </Box>
        </Paper>
    );
};

export default LineChartWithUpload;
