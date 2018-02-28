$.ajax({
	type: "POST",
	url: "http://zcyhcx.applinzi.com/api/getWeither",
	data: {
		latitude: 30.8,
		longitude: 103.86
	},
	dataType: "json",
	success: function(res) {
		res = JSON.parse(res.data);
		console.log(res);

		Array.min = function(arr) {
			arr = [res.result.daily[0].night.templow, res.result.daily[1].night.templow, res.result.daily[2].night.templow, res.result.daily[3].night.templow, res.result.daily[4].night.templow, res.result.daily[5].night.templow, res.result.daily[6].night.templow];
			return Math.min.apply(Math, arr);
		}
		xa = function(arr) {
			arr = [res.result.daily[0].night.templow, res.result.daily[1].night.templow, res.result.daily[2].night.templow, res.result.daily[3].night.templow, res.result.daily[4].night.templow, res.result.daily[5].night.templow, res.result.daily[6].night.templow];
			var min = Array.min(arr);
			var m;
			for(var a = 0; a < arr.length; a++) {
				if(arr[a] == min) {
					console.log(a);
					m = a;
					a = 100;
				}
			}
			return m;
		}

		cando(res);
		se(res);
	},
	error: function() {
		console.log("失败");
	},
	complete: function() {
		console.log("完成请求");
	}
});

function cando(res) {
	////基于准备好的DOM，初始化echarts实例
	var myChart = echarts.init(document.getElementsByClassName('first')[0]);
	// 指定图表的配置项和数据
	var option = {
		title: {
			text: '未来一周气温变化',
			subtext: '郫县'
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: ['最高气温', '最低气温']
		},
		toolbox: {
			show: true,
			feature: {
				dataZoom: {
					yAxisIndex: 'none'
				},
				dataView: {
					readOnly: false
				},
				magicType: {
					type: ['line', 'bar']
				},
				restore: {},
				saveAsImage: {}
			}
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: [res.result.daily[0].week, res.result.daily[1].week, res.result.daily[2].week, res.result.daily[3].week, res.result.daily[4].week, res.result.daily[5].week, res.result.daily[6].week]
		},
		yAxis: {
			type: 'value',
			axisLabel: {
				formatter: '{value} °C'
			}
		},
		series: [{
				name: '最高气温',
				type: 'line',
				data: [res.result.daily[0].day.temphigh, res.result.daily[1].day.temphigh, res.result.daily[2].day.temphigh, res.result.daily[3].day.temphigh, res.result.daily[4].day.temphigh, res.result.daily[5].day.temphigh, res.result.daily[6].day.temphigh],
				markPoint: {
					data: [{
							type: 'max',
							name: '最大值'
						},
						{
							type: 'min',
							name: '最小值'
						}
					]
				},
				markLine: {
					data: [{
						type: 'average',
						name: '平均值'
					}]
				}
			},
			{
				name: '最低气温',
				type: 'line',
				data: [res.result.daily[0].night.templow, res.result.daily[1].night.templow, res.result.daily[2].night.templow, res.result.daily[3].night.templow, res.result.daily[4].night.templow, res.result.daily[5].night.templow, res.result.daily[6].night.templow],
				markPoint: {
					data: [{
						name: '周最低',
						value: Array.min([res.result.daily[0].night.templow, res.result.daily[1].night.templow, res.result.daily[2].night.templow, res.result.daily[3].night.templow, res.result.daily[4].night.templow, res.result.daily[5].night.templow, res.result.daily[6].night.templow]),
						xAxis: xa(),
						yAxis: Array.min([res.result.daily[0].night.templow, res.result.daily[1].night.templow, res.result.daily[2].night.templow, res.result.daily[3].night.templow, res.result.daily[4].night.templow, res.result.daily[5].night.templow, res.result.daily[6].night.templow])
					}]
				},
				markLine: {
					data: [{
							type: 'average',
							name: '平均值'
						},
						[{
							symbol: 'none',
							x: '90%',
							yAxis: 'max'
						}, {
							symbol: 'circle',
							label: {
								normal: {
									position: 'start',
									formatter: '最大值'
								}
							},
							type: 'max',
							name: '最高点'
						}]
					]
				}
			}
		]
	};

	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}

function se(res) {
	////基于准备好的DOM，初始化echarts实例
	var myChart = echarts.init(document.getElementsByClassName('second')[0]);
	// 指定图表的配置项和数据
	var option = {
		title: {
			text: '今日气温变化',
			subtext: '郫县'
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: ['此时气温']
		},
		toolbox: {
			show: true,
			feature: {
				dataZoom: {
					yAxisIndex: 'none'
				},
				dataView: {
					readOnly: false
				},
				magicType: {
					type: ['line', 'bar']
				},
				restore: {},
				saveAsImage: {}
			}
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: [res.result.hourly[0].time,
				res.result.hourly[1].time,
				res.result.hourly[2].time,
				res.result.hourly[3].time,
				res.result.hourly[4].time,
				res.result.hourly[5].time,
				res.result.hourly[6].time,
				res.result.hourly[7].time,
				res.result.hourly[8].time,
				res.result.hourly[9].time,
				res.result.hourly[10].time,
				res.result.hourly[11].time,
				res.result.hourly[12].time,
				res.result.hourly[13].time,
				res.result.hourly[14].time,
				res.result.hourly[15].time,
				res.result.hourly[16].time,
				res.result.hourly[17].time,
				res.result.hourly[18].time,
				res.result.hourly[19].time,
				res.result.hourly[20].time,
				res.result.hourly[21].time,
				res.result.hourly[22].time,
				res.result.hourly[23].time
			]
		},
		yAxis: {
			type: 'value',
			axisLabel: {
				formatter: '{value} °C'
			}
		},
		series: [{
			name: '此时气温',
			type: 'line',
			data: [res.result.hourly[0].temp,
				res.result.hourly[1].temp,
				res.result.hourly[2].temp,
				res.result.hourly[3].temp,
				res.result.hourly[4].temp,
				res.result.hourly[5].temp,
				res.result.hourly[6].temp,
				res.result.hourly[7].temp,
				res.result.hourly[8].temp,
				res.result.hourly[9].temp,
				res.result.hourly[10].temp,
				res.result.hourly[11].temp,
				res.result.hourly[12].temp,
				res.result.hourly[13].temp,
				res.result.hourly[14].temp,
				res.result.hourly[15].temp,
				res.result.hourly[16].temp,
				res.result.hourly[17].temp,
				res.result.hourly[18].temp,
				res.result.hourly[19].temp,
				res.result.hourly[20].temp,
				res.result.hourly[21].temp,
				res.result.hourly[22].temp,
				res.result.hourly[23].temp
			]
		}]
	};

	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}