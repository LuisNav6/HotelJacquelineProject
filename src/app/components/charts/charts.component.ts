import { Component, OnInit } from '@angular/core';
import {Chart,registerables}from 'node_modules/chart.js'
import { CrudService } from '../../shared/crud.service';
import { User } from '../../shared/student';
import { format } from 'date-fns';

Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  chartInstance: Chart;
  checkInDate: string;
  usersByCheckInDate: User[] = [];
  weeklyResults: number[] = [];

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.searchUsersByCheckInWk();
  }

  searchUsersByCheckInWk() {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    this.checkInDate = format(firstDayOfMonth, 'yyyy-MM-dd');

    const dailyResults = [];

    const startDate = new Date(firstDayOfMonth);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    while (startDate <= endDate) {
      const formattedDate = format(startDate, 'yyyy-MM-dd');

      this.crudService.GetUsersByCheckInDate(formattedDate)
        .subscribe((users) => {
          const dailyCount = users.length;
          dailyResults.push(dailyCount);

          // Si se han obtenido los resultados para todos los días del mes, crear la gráfica
          if (dailyResults.length === endDate.getDate()) {
            this.renderChart(dailyResults);
            this.createTable(dailyResults);
          }
        });

      startDate.setDate(startDate.getDate() + 1);
    }
  }

  renderChart(dailyResults: number[]) {
    const weeklyResults = [];
    const weeksCount = Math.ceil(dailyResults.length / 7);
  
    for (let i = 0; i < weeksCount; i++) {
      const startIndex = i * 7;
      const endIndex = startIndex + 7;
      const weeklyCount = dailyResults.slice(startIndex, endIndex).reduce((a, b) => a + b, 0);
      weeklyResults.push(weeklyCount);
    }
  
    const labels = Array.from({ length: weeksCount }, (_, index) => `Semana ${index + 1}`);
    
      const chartCanvas = document.getElementById('linechart') as HTMLCanvasElement;
      const pieChartCanvas = document.getElementById('pieChartCanvas') as HTMLCanvasElement;
      
      if (this.chartInstance) {
        this.chartInstance.destroy();
        this.chartInstance = null;
      }
      this.chartInstance = new Chart(chartCanvas, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Number of Reservations',
              data: weeklyResults,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
              ],
              borderColor: [
                'rgb(255, 99, 132,1)',
                'rgb(255, 159, 64,1)',
                'rgb(255, 205, 86,1)',
                'rgb(75, 192, 192,1)',
                'rgb(54, 162, 235,1)',
              ],
              borderWidth: 2,
              borderRadius: 20
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                font: {
                  size: 18,
                  weight: 'bold'
                }
              },
              legend: {
                display: true,
                position: 'bottom',
                labels: {
                  font: {
                    size: 14,
                    weight: 'bold'
                  }
                }
              }
            },
            scales: {
              x: {
                grid: {
                  display: false
                },
                ticks: {
                  font: {
                    size: 14,
                    weight: 'bold'
                  }
                }
              },
              y: {
                beginAtZero: true,
                grid: {
                  display: false
                },
                ticks: {
                  font: {
                    size: 14,
                    weight: 'bold'
                  }
                }
              }
            }
          }
        });

        const pieChart = new Chart(pieChartCanvas, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              label: 'Número de Reservaciones',
              data: weeklyResults,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
              ],
              borderColor: [
                'rgb(255, 99, 132,1)',
                'rgb(255, 159, 64,1)',
                'rgb(255, 205, 86,1)',
                'rgb(75, 192, 192,1)',
                'rgb(54, 162, 235,1)',
              ],
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: false,
                font: {
                  size: 18,
                  weight: 'bold'
                }
              },
              legend: {
                display: true,
                position: 'bottom',
                labels: {
                  font: {
                    size: 8,
                    weight: 'light'
                  }
                }
              }
            }
          }
        });
  }

  createTable(dailyResults: number[]) {
    const tableContainer = document.getElementById('table-container');
    const table = document.createElement('table');
    const tableHead = document.createElement('thead');
    const tableBody = document.createElement('tbody');
  
    // Crea la fila de encabezado de la tabla
    const headerRow = document.createElement('tr');
    const headerCellWeek = document.createElement('th');
    const headerCellCount = document.createElement('th');
    headerCellWeek.textContent = 'Week';
    headerCellCount.textContent = 'Reservations';
    headerRow.appendChild(headerCellWeek);
    headerRow.appendChild(headerCellCount);
    tableHead.appendChild(headerRow);
  
    // Obtiene el número total de semanas
    const totalWeeks = Math.ceil(dailyResults.length / 7);
  
    // Crea las filas de datos de la tabla
    for (let i = 0; i < totalWeeks; i++) {
      const startIdx = i * 7; // Índice de inicio de la semana
      const endIdx = Math.min(startIdx + 6, dailyResults.length - 1); // Índice de fin de la semana
  
      const weekRow = document.createElement('tr');
      const weekCell = document.createElement('td');
      weekCell.textContent = `${i + 1}`;
      weekRow.appendChild(weekCell);
  
      const reservationCounts = dailyResults.slice(startIdx, endIdx + 1);
      const totalReservations = reservationCounts.reduce((sum, count) => sum + count, 0);
  
      const countCell = document.createElement('td');
      countCell.textContent = totalReservations.toString();
      weekRow.appendChild(countCell);
  
      tableBody.appendChild(weekRow);
    }
  
    // Agrega el encabezado y los datos a la tabla
    table.appendChild(tableHead);
    table.appendChild(tableBody);
  
    // Establece el estilo para centrar el contenido y agregar padding
    table.style.textAlign = 'center';
    table.style.padding = '100px';
    table.style.width= '100%';

  
    // Agrega la tabla al contenedor
    tableContainer.appendChild(table);
  }
  
}

