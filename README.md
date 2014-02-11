a3-naveenks-lijl
================

## Team Members

1. Naveen Kumar Sharma naveenks@uw.edu
2. Jialin Li lijl@uw.edu

## Project Name

Visualizing earthquakes around the world in 2013

## Goals

The goal of this tool is to visualize the earthquake activity across the
year 2013. Primarily, we wanted to observe the following things:

* Where do the earthquakes happen? By plotting exact location on a map.
* How frequent are earthquakes? By playing an animation of all earthquakes.
* What were the largest/deepest earthquakes in a given period?
* Visualize the earthquake fault lines.
* Animate the progression of earthquakes during a period of time.

## Dataset

We collected all our data from the USGS website archives located here:
http://earthquake.usgs.gov/earthquakes/. We cleaned the data to remove
redundant information and retained the following attributes.

* Time of Earthquake.
* Latitude and Longitude.
* Magnitude (in Richter scale).
* Depth (in miles).

## Running Instructions

Our web-based tool is available online at
http://cse512-14w.github.io/a3-naveenks-lijl/. Or by checking out a copy
and opening index.html in a browser.

## Story Board

We were interested in visualizing earthquake data and found this map
http://earthquake.usgs.gov/earthquakes/map/ somewhat helpful. However,
we felt it was missing some interesting features as well. We were not
able to see earthquake activity over long period of time or visualize
their magnitudes. Hence the aim of our initial storyboard was as
follows.

* On a map show the exact location of earthquakes, represented by a circle.
* The size of the circle depicts magnitude of the earthquake.
* Support filters to select earthquakes with certain magnitude and depth.
* Animation to replay earthquakes over a certain period of time with varying speeds.
* Plot the distribution of earthquakes happening in a specified period.
* Group earthquakes regions (or sources) and plot them with different colors.

We had the following image in mind for our visualization.

![storyboard](https://raw.github.com/CSE512-14W/a3-naveenks-lijl/master/Storyboard.png) 

## Development Process

We used D3 for drawing circles and animating them and leaflet.js
(http://leafletjs.com/) for the map API.

Breakdown of work.

Naveen (~24 hrs):
* Acquiring dataset and cleaning and transformation.
* Leafletjs API usage.

Jialin (~30 hrs):
* D3 and javascript animation and coding.
* Understanding Maps API and integrating with D3.

## Description of Visualization

Our final visualization consists of a zoomable map which plots all the
earthquake events in a specified period of time. We support several
filters to allow observing specific classes of earthquakes. We could not
finish the distribution and region grouping due to lack of time.

Filters
* Show earthquakes with magnitude greater than a certain value.
* Show earthwuakes with depth greater than a certain value.
* Show all earthquakes in a certain period (start day (0-365), hour(0-23) and end day).
* Play the animation starting from day 0 with varying speeds.
* Manually drag the slider at the bottom to see earthquakes at a particular hour.
* For more preciseness, manually enter the day and hour in the given textbox to see all the earthquakes.
